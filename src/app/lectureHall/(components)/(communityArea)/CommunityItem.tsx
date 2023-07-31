"use client";
import ModalWrapper from "@/components/ModalWrapper";
import type { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import LectureCommentInput from "./CommentInput";
import LectureCommunityItemList from "./communityItemList";
import ReplyItem from "./ReplyItem";

const LectureCommunityItem = ({
  comment,
  lectureId,
}: {
  comment: LectureComment;
  lectureId: string;
}) => {
  const [commentItem, setCommentItem] = useState<LectureComment | null>(null);
  const [mention, setMention] = useState("");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
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
      {commentModalIsOpen && commentItem && (
        <ModalWrapper
          handleModal={modalCloseHandler}
          modalTitle={<h1>상세보기</h1>}
        >
          <div>
            <ReplyItem
              comment={comment}
              lectureId=""
              mentionHandler={mentionHandler}
              modalCloseHandler={modalCloseHandler}
            />
            <LectureCommunityItemList
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
      <button
        className="w-full mb-3 min-h-[90px] bg-white rounded-2xl p-4  flex items-center justify-center border-grayscale-10 border-2"
        onClick={() => {
          modalOpenHandler(comment);
        }}
      >
        <div className="w-11">{comment.user?.profileImage}</div>
        <div className="flex-1">
          <div className="flex mb-2">
            <div className="mr-1 text-base font-bold">
              {comment.user?.username}
            </div>{" "}
            · <div className="text-grayscale-40 ml-1">{comment.user?.role}</div>
          </div>
          <div className="text-sm w-full flex">{comment.content}</div>
        </div>
        <div className="">
          <div className="text-grayscale-40 text-xs mb-2">
            답글 {comment.replyCount}개
          </div>
          <div className="text-grayscale-40 text-xs ">
            {getTime(comment.createdAt.toDate())}
          </div>
        </div>
      </button>
    </>
  );
};

export default LectureCommunityItem;
