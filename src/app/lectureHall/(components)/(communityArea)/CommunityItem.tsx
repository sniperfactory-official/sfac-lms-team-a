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
import { Avatar, Text, Title } from "sfac-designkit-react";

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
          modalTitle={
            <Title size="xl" className="mb-5">
              상세보기
            </Title>
          }
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
        <div className="w-10 relative h-10 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
          {comment.user !== undefined && (
            <Avatar
              src={comment.user.profileImage}
              ring={false}
              className="object-cover w-10 h-10 rounded-full"
              size={45}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-[2px] items-center">
            <div className="mr-1">
              <Text size="base" weight="bold">
                {comment.user?.username}
              </Text>
            </div>{" "}
            <div className="rounded-full h-[5px] w-[5px] bg-grayscale-20"></div>{" "}
            <div className="text-grayscale-40 ml-1">
              {comment.user?.role === "관리자" ? (
                <Text size="base" weight="medium">
                  매니저
                </Text>
              ) : (
                <Text size="base" weight="medium">
                  {comment.user?.role}
                </Text>
              )}
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
            <Text size="xs" weight="medium">
              답글 {comment.replyCount}개
            </Text>
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
