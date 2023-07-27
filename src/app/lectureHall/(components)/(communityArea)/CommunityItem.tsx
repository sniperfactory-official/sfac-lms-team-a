"use client"
import ModalWrapper from "@/components/ModalWrapper";
import type { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useState } from "react";
import LectureCommentInput from "./CommentInput";

const LectureCommunityItem = ({ comment }:{comment:LectureComment}) => {
    const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
    const modalOpenHandler = () => {
    setCommentModalIsOpen((prev) => {
      return !prev
    })
  }
    return (
        <>
            {commentModalIsOpen && <ModalWrapper handleModal={modalOpenHandler} modalTitle={<h1>상세보기</h1>}>
                <LectureCommentInput></LectureCommentInput>
            </ModalWrapper> }
            <button  className="w-full min-h-[90px] bg-white rounded-2xl p-4  flex items-center justify-center" onClick={modalOpenHandler}>
                <div className="w-11">
                    {comment.user!.profileImage }
                </div>
                <div className="flex-1">
                    <div className="flex mb-2"><div className="mr-1 text-base font-bold">{comment.user!.username}</div> · <div className="text-grayscale-40 ml-1">{ comment.user!.role }</div></div>
                    <div className="text-sm w-full flex">{comment.content}</div>
                </div>
                <div className="">
                    <div className="text-grayscale-40 text-xs mb-2">답글 { comment.replyCount }개</div>
                    <div className="text-grayscale-40 text-xs ">{ getTime(comment.createdAt.toDate()) }</div>
                </div>
            </button>
        </>
    )
}

export default LectureCommunityItem;