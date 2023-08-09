"use client";
import ModalWrapper from "@/components/ModalWrapper";
import type { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import LectureCommentInput from "./CommentInput";
import LectureCommunityItemList from "./communityItemList";
import ReplyItem from "./ReplyItem";
import Image from "next/image";
import LectureCommentContentMention from "./CommentContent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LectureCommunityItem = ({
  comment,
  lectureId,
  nowPlayTimeHandler,
}: {
  comment: LectureComment;
  lectureId: string;
  nowPlayTimeHandler: (time: string) => void;
}) => {
  const [commentItem, setCommentItem] = useState<LectureComment | null>(null);
  const [mention, setMention] = useState("");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const myInfo = useSelector((store: RootState) => store.userInfo);
  const modalOpenHandler = (e: LectureComment) => {
    setCommentItem(e);
    setCommentModalIsOpen(prev => {
      return !prev;
    });
  };

  const modalCloseHandler = () => {
    setCommentModalIsOpen(false);
  };

  const mentionHandler = (inputText: string) => {
    setMention(inputText);
  };

  useEffect(() => {
    if (!commentModalIsOpen) {
      setCommentItem(null);
    }
  }, [commentModalIsOpen]);
  return (
    <>
      {commentModalIsOpen && commentItem && myInfo && (
        <ModalWrapper
          onCloseModal={modalCloseHandler}
          modalTitle={<h1 className="mb-5">상세보기</h1>}
        >
          <div>
            <ReplyItem
              nowPlayTimeHandler={nowPlayTimeHandler}
              userId={myInfo.id}
              comment={comment}
              lectureId={lectureId}
              mentionHandler={mentionHandler}
              modalCloseHandler={modalCloseHandler}
            />
            <LectureCommunityItemList
              nowPlayTimeHandler={nowPlayTimeHandler}
              userId={myInfo.id}
              selectId={lectureId}
              parentId={commentItem.id}
              mentionHandler={mentionHandler}
              modalCloseHandler={modalCloseHandler}
            />
            <LectureCommentInput
              mention={mention}
              mentionHandler={mentionHandler}
              modalCloseHandler={modalCloseHandler}
              lectureId={lectureId}
              replyCount={commentItem.replyCount}
              parentId={commentItem.id}
            ></LectureCommentInput>
          </div>
        </ModalWrapper>
      )}
      <div className="w-full mb-3 min-h-[90px] bg-white rounded-2xl p-4  flex items-center justify-center border-grayscale-10 border-2">
        <div className="w-11 relative h-11 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
          {comment.user !== undefined &&
            (comment.user.profileImage === "" ? (
              <Image
                src={"/images/logo.svg"}
                alt="사용자 프로필"
                width={30}
                height={30}
                objectFit="cover"
              ></Image>
            ) : (
              <Image
                src={comment.user.profileImage}
                alt="사용자 프로필 이미지"
                fill
                objectFit="cover"
              />
            ))}
        </div>
        <div className="flex-1">
          <div className="flex mb-2">
            <div className="mr-1 text-base font-bold">
              {comment.user?.username}
            </div>{" "}
            ·{" "}
            <div className="text-grayscale-40 ml-1">
              {comment.user?.role === "관리자" ? "매니저" : comment.user?.role}
            </div>
          </div>
          <div className="text-sm w-full text-start">
            <LectureCommentContentMention
              content={comment.content}
              nowPlayTimeHandler={nowPlayTimeHandler}
            ></LectureCommentContentMention>
          </div>
        </div>
        <div className="">
          <button
            className="text-grayscale-40 text-xs mb-2"
            onClick={() => {
              modalOpenHandler(comment);
            }}
          >
            답글 {comment.replyCount}개
          </button>
          <div className="text-grayscale-40 text-xs ">
            {getTime(comment.createdAt.toDate())}
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureCommunityItem;
