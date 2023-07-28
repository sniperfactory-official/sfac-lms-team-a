"use client";
import ModalWrapper from "@/components/ModalWrapper";
import type { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import LectureCommentInput from "./CommentInput";
import LectureCommunityItemList from "./communityItemList";


const LectureCommunityItem = ({ comment,lectureId }: { comment: LectureComment,lectureId:string }) => {
  const [commentItem, setCommentItem] = useState<LectureComment|null>(null);
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const modalOpenHandler = (e: LectureComment) => {
    setCommentItem(e)
    setCommentModalIsOpen(prev => {
      return !prev;
    });
  };

  const modalCloseHandler = () => {
    setCommentModalIsOpen(false)
  }

  useEffect(() => {
    if (!commentModalIsOpen) {
      setCommentItem(null)
    }
  },[commentModalIsOpen])
  return (
    <>
      {commentModalIsOpen && (
        <ModalWrapper
          handleModal={modalCloseHandler}
          modalTitle={<h1>상세보기</h1>}
        >
          <div>
            <LectureCommunityItemList selectId={lectureId} parentId="" modalOpenHandler={modalOpenHandler}/>
            <LectureCommentInput parentId={lectureId}></LectureCommentInput>
          </div>
        </ModalWrapper>
      )}
      <button
        className="w-full min-h-[90px] bg-white rounded-2xl p-4  flex items-center justify-center"
        onClick={() => { modalOpenHandler(comment) }}
      >
        <div className="w-11">{comment.user!.profileImage}</div>
        <div className="flex-1">
          <div className="flex mb-2">
            <div className="mr-1 text-base font-bold">
              {comment.user!.username}
            </div>{" "}
            · <div className="text-grayscale-40 ml-1">{comment.user!.role}</div>
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
