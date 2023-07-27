"use client";
import useCreateFeedback from "@/hooks/reactQuery/useCreateFeedback";
import useGetFeedbacks from "@/hooks/reactQuery/useGetFeedbacks";
import { Feedback } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";

const Feedback = () => {
  // docId === submittedAssignmentId
  // 즉 Dynamic Route는 따로 되지 않으므로 나중에 submittedAssignment 클릭시 이벤트로 id 가져오기
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading } = useGetFeedbacks(docId);
  const { mutate } = useCreateFeedback();
  // console.log(data);

  const { register, handleSubmit, reset } = useForm<Feedback>({
    mode: "onSubmit",
  });

  const onSubmitFeedback = async (data: Feedback) => {
    if (data === undefined) return;

    try {
      await mutate({
        docId: "gZWELALnKoZLzJKjXGUM",
        feedback: {
          id: data.id,
          userId: data.userId,
          parentId: data.parentId,
          content: data.content,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      reset({ content: "" });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 등록되지 않았습니다.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section className="flex flex-col p-5 gap-5">
        {data?.map(feedback => {
          return (
            <li
              className="rounded-lg p-7 border border-grayscale-10 list-none"
              key={feedback.id}
            >
              <section className="flex gap-2">
                {/* 프로필 이미지 들어가야함 */}
                <div className="font-bold">{feedback.user?.username}</div>
                <div className="text-grayscale-40">
                  {feedback.user?.role !== "수강생" ? "멘토" : "수강생"}
                </div>
              </section>
              <div className="pt-5 text-[12px]">{feedback.content}</div>
              <small className="flex justify-end text-[12px] text-grayscale-40">
                {getTime(feedback.createdAt.toDate())}
              </small>
            </li>
          );
        })}
        <form
          onSubmit={handleSubmit(onSubmitFeedback)}
          className="rounded-lg p-5 border border-grayscale-10"
        >
          <section className="flex justify-between">
            <input
              {...register("content", {
                required: "내용을 입력해주세요.",
                maxLength: 300,
              })}
              placeholder="댓글을 입력해주세요."
              className="placeholder-grayscale-20"
            />
            <button>업로드</button>
          </section>
        </form>
      </section>
    </>
  );
};

export default Feedback;
