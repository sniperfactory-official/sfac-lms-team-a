import React from "react";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import useDeleteComment from "@/hooks/reactQuery/comment/useDeleteComment";
import { getTime } from "@/utils/getTime";
import CommunityCommentMention from "./CommunityCommentMention";
import { DocumentData } from "@firebase/firestore";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";

interface NestedId {
  parentId: string | undefined;
  tagId: string | undefined;
}

interface CommentCardProps {
  postId?: string;
  comment: DocumentData;
  commentData?: DocumentData;
  userId: string;
  handleUpdateId: (updateId: DocumentData | undefined) => void;
  handleNestedId: (nestedId: NestedId | undefined) => void;
}

export default function CommentCard({
  comment,
  commentData,
  userId,
  handleUpdateId,
  handleNestedId,
}: CommentCardProps) {
  // delete 함수
  const { mutate: deleteMutate, error: deleteError } = useDeleteComment();

  const deleteComment = (commentId: string) => {
    if (deleteError) {
      console.error(deleteError);
      return;
    }
    deleteMutate({
      commentId: commentId,
    });
  };

  // 프로필 이미지
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileImage(comment.user.profileImage);

  return (
    <div className="flex flex-1 items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-3 ">
      <div className="w-[43px] h-[43px] relative mr-2">
        <Image
          src={profileData ?? "/images/avatar.svg"}
          alt="프로필"
          layout="fill"
          className=" rounded-[50%] object-cover object-center"
        />
      </div>
      <div className=" w-full">
        <div className="flex items-center ">
          <div className="flex items-center flex-1">
            <span>{comment.user.username}</span>
            <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
            <span className="text-gray-400">{comment.user.role}</span>
          </div>

          {comment?.userId.path.split("/")[1] === userId ? (
            <div className="flex divide-x-2 divide-gray text-sm">
              <div>
                <button
                  className="mr-1"
                  onClick={() => {
                    handleUpdateId(comment);
                    handleNestedId(undefined);
                  }}
                >
                  수정
                </button>
              </div>
              <div>
                <button
                  className="ml-1"
                  onClick={() => {
                    deleteComment(comment.id);
                    handleUpdateId(undefined);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="ml-1 text-sm"
                onClick={() => {
                  handleNestedId({
                    parentId: commentData?.id,
                    tagId: comment.user.username,
                  });
                  handleUpdateId(undefined);
                }}
              >
                답글달기
              </button>
            </div>
          )}
        </div>
        <div className="flex w-full justify-between mt-1">
          <div className="text-base flex">
            {commentData ? (
              <CommunityCommentMention content={comment.content} />
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
          <span className="text-gray-400 text-sm">
            {getTime(comment.createdAt.toDate())}
          </span>
        </div>
      </div>
    </div>
  );
}
