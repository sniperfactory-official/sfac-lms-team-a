import React from "react";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import useUpdateComment from "@/hooks/reactQuery/comment/useUpdateComment";
import useDeleteComment from "@/hooks/reactQuery/comment/useDeleteComment";
import { Timestamp } from "firebase/firestore";
import { Post } from "@/types/firebase.types";

interface CommentCardProps {
  postData: Post;
  comment: Post;
  userId: string;
  handleUpdateId: (updateId: object) => void;
  handleNestedId: (nestedId: object) => void;
}

export default function CommentCard({
  comment,
  postData,
  userId,
  handleUpdateId,
  handleNestedId,
}: CommentCardProps) {
  const now = Timestamp.now();
  // update 함수
  const { mutate: updateMutate, error: updateError } = useUpdateComment();
  const updateComment = (commentId: string) => {
    if (updateError) {
      console.error(updateError);
      return;
    }
    updateMutate({
      commentId: commentId,
      // 1. 시간계산 필요, 업데이트 할 내용
      content: {
        updatedAt: now,
        content: "댓글 수정",
      },
    });
  };
  // delete 함수
  const { mutate: deleteMutate, error: deleteError } = useDeleteComment();
  const deleteComment = (commentId: string) => {
    if (updateError) {
      console.error(updateError);
      return;
    }
    deleteMutate({
      commentId: commentId,
    });
  };

  return (
    <div className="flex flex-1 items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-3 ">
      <Image
        src={
          postData?.user?.profileImage ? postData?.user?.profileImage : avatar
        }
        alt="프로필"
        width={43}
        height={43}
        className="mr-2"
      />
      <div className=" w-full">
        <div className="flex items-center ">
          <div className="flex items-center flex-1">
            <span>{comment?.user?.username}</span>
            <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
            <span className="text-gray-400">{comment?.user?.role}</span>
          </div>

          {comment?.userId?.path.split("/")[1] === userId ? (
            <div className="flex divide-x-2 divide-gray text-sm">
              <div>
                <button
                  className="mr-1"
                  onClick={() => handleUpdateId(comment)}
                >
                  수정
                </button>
              </div>
              <div>
                <button
                  className="ml-1"
                  onClick={() => deleteComment(comment.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="ml-1 text-sm"
                onClick={() => handleNestedId(comment)}
              >
                답글달기
              </button>
            </div>
          )}
        </div>
        <div className="flex w-full justify-between mt-1">
          <p className="text-base">{comment.content}</p>
          <span className="text-gray-400 text-sm">3일 전</span>
        </div>
      </div>
    </div>
  );
}
