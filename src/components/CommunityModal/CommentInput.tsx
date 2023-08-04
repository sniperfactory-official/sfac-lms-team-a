import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import useUpdateComment from "@/hooks/reactQuery/comment/useUpdateComment";
import useCreateComment from "@/hooks/reactQuery/comment/useCreateComment";
import { useForm } from "react-hook-form";
import { Post } from "@/types/firebase.types";
import { useEffect } from "react";
import { DocumentData } from "@firebase/firestore";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";
import { useAppSelector } from "@/redux/store";

interface FormValue {
  content: string;
}

interface NestedId {
  parentId: string | undefined;
  tagId: string | undefined;
}

interface CommentInputProps {
  postData: Post;
  userData: DocumentData;
  postId: string;
  updateId: DocumentData | undefined;
  nestedId: NestedId | undefined;
  handleUpdateId: (updateId: DocumentData | undefined) => void;
  handleNestedId: (nestedId: NestedId | undefined) => void;
}

export default function CommentInput({
  postData,
  userData,
  postId,
  updateId,
  nestedId,
  handleUpdateId,
  handleNestedId,
}: CommentInputProps) {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<FormValue>();
  // create 함수
  const { mutate: createMutate, error: createError } = useCreateComment();
  const profileUrl = useAppSelector(state => state.userInfo.profileImage);

  useEffect(() => {
    updateId ? setValue("content", updateId.content) : setValue("content", "");
    // nestedId &&
  }, [updateId, nestedId]);

  // 프로필 이미지
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileImage(profileUrl);

  const createComment = (newComment: FormValue) => {
    if (createError) {
      console.error(createError);
      return;
    }
    if (postData?.userId) {
      if (nestedId) {
        createMutate({
          post: {
            parentId: nestedId.parentId,
            content: `@${nestedId.tagId} ${newComment.content}`,
            createdAt: now,
            userId: userData.userRef,
          },
        });
      } else {
        createMutate({
          post: {
            parentId: postId,
            content: newComment.content,
            createdAt: now,
            userId: userData.userRef,
          },
        });
      }
    }
    reset();
    handleNestedId(undefined);
  };

  // update 함수
  const { mutate: updateMutate, error: updateError } = useUpdateComment();
  const updateComment = (updateId: DocumentData, newComment: FormValue) => {
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
    handleUpdateId(undefined);
  };

  const contentValue = watch("content");
  const now = Timestamp.now();

  if (!profileLoading) {
    return (
      <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 ">
        <div className=" w-full">
          <div className="flex items-center ">
            <Image
              src={profileData ?? "/images/avatar.svg"}
              alt="프로필"
              width={30}
              height={30}
              className="mr-2 rounded-[50%]"
            />
            <div className="flex items-center flex-1">
              <span>{userData?.username}</span>
              <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
              <span className="text-gray-400">{userData?.role}</span>
            </div>
          </div>
          <form
            className="flex w-full mt-1 items-center"
            onSubmit={handleSubmit(newComment =>
              updateId
                ? updateComment(updateId, newComment)
                : createComment(newComment),
            )}
          >
            {nestedId && (
              <span className="text-primary-80 mr-2">@{nestedId.tagId}</span>
            )}
            <input
              className="text-base flex-1 mr-4 px-1"
              required
              {...register("content")}
            />
            {updateId ? (
              <>
                <button
                  onClick={() => {
                    handleUpdateId(undefined);
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
}
