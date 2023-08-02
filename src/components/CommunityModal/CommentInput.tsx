import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import useUpdateComment from "@/hooks/reactQuery/comment/useUpdateComment";
import useCreateComment from "@/hooks/reactQuery/comment/useCreateComment";
import { useForm } from "react-hook-form";
import { Post, User } from "@/types/firebase.types";
import { useEffect } from "react";
import { spawn } from "child_process";

interface FormValue {
  content: string;
}

interface CommentInputProps {
  postData: Post;
  userData: User;
  postId: string;
  updateId: object;
  nestedId: object;
  handleUpdateId: (updateId: object) => void;
}

export default function CommentInput({
  postData,
  userData,
  postId,
  updateId,
  nestedId,
  handleUpdateId,
}: CommentInputProps) {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<FormValue>();
  // create 함수
  const { mutate: createMutate, error: createError } = useCreateComment();

  useEffect(() => {
    updateId && setValue("content", updateId.content);
    // nestedId &&
  }, [updateId, nestedId]);

  const createComment = (newComment: FormValue) => {
    if (createError) {
      console.error(createError);
      return;
    }
    if (postData?.userId) {
      createMutate({
        post: {
          parentId: postId,
          content: newComment.content,
          createdAt: now,
          userId: postData.userId,
        },
      });
    }
    reset();
  };

  // update 함수
  const { mutate: updateMutate, error: updateError } = useUpdateComment();
  const updateComment = (updateId: string, newComment: FormValue) => {
    if (updateError) {
      console.error(updateError);
      return;
    }
    updateMutate({
      commentId: updateId.id,
      // 1. 시간계산 필요, 업데이트 할 내용
      content: {
        updatedAt: now,
        content: newComment.content,
      },
    });
    reset();
  };

  const contentValue = watch("content");
  const now = Timestamp.now();

  return (
    <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 ">
      <div className=" w-full">
        <div className="flex items-center ">
          <Image
            src={
              postData?.user?.profileImage
                ? postData?.user?.profileImage
                : avatar
            }
            alt="프로필"
            width={30}
            height={30}
            className="mr-2"
          />
          <div className="flex items-center flex-1">
            <span>{userData?.username}</span>
            <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
            <span className="text-gray-400">{userData?.role}</span>
          </div>
        </div>
        <form
          className="flex w-full mt-1"
          onSubmit={handleSubmit(newComment =>
            updateId
              ? updateComment(updateId, newComment)
              : createComment(newComment),
          )}
        >
          {nestedId && <span>@{nestedId.user.username}</span>}
          <textarea
            className="text-base flex-1 mr-4 px-1"
            {...register("content")}
          />
          {updateId ? (
            <>
              <button
                onClick={() => {
                  handleUpdateId();
                  reset();
                }}
                type="reset"
                className={` h-[35px] w-[115px] px-[20px] rounded-[10px] mr-[10px] bg-grayscale-5 text-grayscale-60 hover:bg-primary-80 hover:text-white
                  `}
              >
                취소
              </button>

              <button
                className={` h-[35px] w-[115px] px-[20px] rounded-[10px]  ${
                  contentValue
                    ? "bg-primary-80   text-white"
                    : "bg-grayscale-5 text-grayscale-60"
                }  `}
              >
                수정하기
              </button>
            </>
          ) : (
            <button
              className={` h-[35px] w-[115px] px-[20px] rounded-[10px]  ${
                contentValue
                  ? "bg-primary-80   text-white"
                  : "bg-grayscale-5 text-grayscale-60"
              }  `}
            >
              업로드
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
