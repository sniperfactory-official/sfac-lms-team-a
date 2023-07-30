"use client";
import { Timestamp } from "firebase/firestore";
import { getTime } from "@/utils/getTime";
import ModalWrapper from "@/components/ModalWrapper";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useFetchUserInfo from "@/hooks/reactQuery/useGetPostQuery";
import LoadingSpinner from "@/components/Loading/Loading";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import 화살표 from "/public/images/화살표.svg";
import useFetchUserComment from "@/hooks/reactQuery/comment/useComment";
// import useFetchUserNestedComment from "@/hooks/reactQuery/comment/useNestedComment";
import useUpdateComment from "@/hooks/reactQuery/comment/useUpdateComment";
import useDeleteComment from "@/hooks/reactQuery/comment/useDeleteComment";
import useCreateComment from "@/hooks/reactQuery/comment/useCreateComment";
import useGetPostQuery from "@/hooks/reactQuery/useGetPostQuery";
import { useAppSelector } from "@/redux/store";
import PostButton from "@/components/common/PostButton";
import { useForm } from "react-hook-form";

interface FormValue {
  content: string;
}

export default function CommunityModal() {
  const postId = "YiJVx6OQBhlGGRCUj1WU";
  const userId = useAppSelector(state => state.userId.uid);

  const { register, handleSubmit, watch, reset } = useForm<FormValue>();
  const contentValue = watch("content");

  const parentId = "XFcMPqfLMHxqjXpTUlDH";
  const now = Timestamp.now();
  // create 함수
  const { mutate: createMutate, error: createError } = useCreateComment();
  // update 함수
  const { mutate: updateMutate, error: updateError } = useUpdateComment();
  // delete 함수
  const { mutate: deleteMutate, error: deleteError } = useDeleteComment();
  // 글 정보
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postFetchError,
  } = useFetchUserInfo(postId);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  const { data, isLoading, isError, error } = useGetPostQuery(postId);
  console.log(data?.userId?.path.split("/")[1] === userId);

  // 유저 댓글
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
    error: commentFetchError,
  } = useFetchUserComment(postId);
  // 유저 대댓글
  const {
    data: nestedCommentData,
    isLoading: nestedCommentLoading,
    isError: nestedError,
    error: nestedFetchError,
  } = useFetchUserComment(parentId);

  // const commentData = [1,2,3]
  console.log("댓글", commentData);
  console.log("대댓글", nestedCommentData);

  const date: string = data?.createdAt.toDate().toISOString().split("-");
  console.log(date);
  if (postLoading && isLoading) {
    return <LoadingSpinner />;
  }
  if (postError) {
    return <span>Error: {(postFetchError as Error).message}</span>;
  }
  return (
    <ModalWrapper modalTitle="상세보기">
      <div className="border-solid border border-gray-200 rounded-xl p-4 my-6 text-sm">
        <div className="flex items-center">
          <Image
            src={data?.user.profileImg ? data.profileImg : avatar}
            alt=""
            className="w-10 h-10 mr-2"
          />

          <span className="text-blue-700">{data.user.username}</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">{data.user.role}</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">{`${date[0]}/${
            date[1]
          }/${date[2].slice(0, 2)}`}</span>
        </div>
        <h2 className="text-base font-bold my-2 ">{data?.title}</h2>
        <div>
          <div className="mb-3">{data?.content}</div>
          <div className="flex">
            {data?.images?.map((img, idx) => (
              <>
                <Image
                  src={img}
                  alt="post 이미지"
                  className=" w-14 h-14 rounded-md mr-2 my-6"
                />
              </>
            ))}
          </div>
          <div className="">
            {data?.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-xs py-1 px-2 mr-2 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {commentData?.map((comment, idx) => (
        <div key={idx}>
          <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-3 ">
            <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
            <div className=" w-full">
              <div className="flex items-center ">
                <div className="flex items-center flex-1">
                  <span>{comment.user.username}</span>
                  <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
                  <span className="text-gray-400">{comment.user.role}</span>
                </div>

                {comment?.userId?.path.split("/")[1] === userId && (
                  <div className="flex divide-x-2 divide-gray text-sm">
                    <div>
                      <button
                        className="mr-1"
                        onClick={() =>
                          updateMutate({
                            parentId: postId,
                            // 1. 시간계산 필요, 업데이트 할 내용
                            content: {
                              updatedAt: now,
                              content: "22222",
                            },
                          })
                        }
                      >
                        수정
                      </button>
                    </div>
                    <div>
                      <button
                        className="ml-1"
                        onClick={() =>
                          deleteMutate({
                            parentId: comment.id,
                          })
                        }
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full justify-between mt-1">
                <p className="text-base">{comment.content}</p>
                <span className="text-gray-400 text-sm">3일 전</span>
              </div>
            </div>
          </div>

          {comment.id === parentId &&
            nestedCommentData?.map((nestedComment, idx) => (
              <div className="flex" key={idx}>
                <Image src={화살표} className=" ml-2 mr-[5px]"></Image>
                <div className="flex flex-1 items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-3 ">
                  <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
                  <div className=" w-full">
                    <div className="flex items-center ">
                      <div className="flex items-center flex-1">
                        <span>{nestedComment.user.username}</span>
                        <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
                        <span className="text-gray-400">
                          {nestedComment.user.role}
                        </span>
                      </div>
                      {comment?.userId?.path.split("/")[1] === userId && (
                        <div className="flex divide-x-2 divide-gray text-sm">
                          <div>
                            <button
                              className="mr-1"
                              onClick={() =>
                                updateMutate({
                                  parentId: nestedComment.id,
                                  // 1. 시간계산 필요, 업데이트 할 내용
                                  content: {
                                    updatedAt: now,
                                    content: "댓글 수정",
                                  },
                                })
                              }
                            >
                              수정
                            </button>
                          </div>
                          <div>
                            <button
                              className="ml-1"
                              onClick={() =>
                                deleteMutate({
                                  parentId: parentId,
                                })
                              }
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex w-full justify-between mt-1">
                      <p className="text-base">{nestedComment.content}</p>
                      <span className="text-gray-400 text-sm">
                        {/* {getTime(nestedComment?.createdAt.toDate())} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
      <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 ">
        <div className=" w-full">
          <div className="flex items-center ">
            <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
            <div className="flex items-center flex-1">
              <span>{userData.username}</span>
              <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
              <span className="text-gray-400">{userData.role}</span>
            </div>
          </div>
          <form
            className="flex w-full mt-1"
            onSubmit={handleSubmit(newComment => {
              createMutate({
                post: {
                  parentId: postId,
                  content: newComment.content,
                  createdAt: now,
                  userId: data.userId,
                },
              });
              reset();
            })}
          >
            <input
              className="text-base flex-1 mr-4 px-1"
              {...register("content")}
            />
            <button
              className={` h-[31px] px-[20px] rounded-[10px] bg-grayscale-5 ${
                contentValue
                  ? "bg-primary-80  text-white "
                  : "bg-white text-primary-80"
              }  `}
            >
              업로드
            </button>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
