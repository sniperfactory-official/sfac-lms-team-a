"use client";
import useCreateFeedback from "@/hooks/reactQuery/useCreateFeedback";
import useGetFeedbacks from "@/hooks/reactQuery/useGetFeedbacks";
import { Feedback } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FeedbackCard from "./FeedbackCard";
import Card from "../Card";

const Feedback = () => {
  const [isContent, setIsContent] = useState(false);
  // docId === submittedAssignmentId
  // 즉 Dynamic Route는 따로 되지 않으므로 나중에 submittedAssignment 클릭시 이벤트로 id 가져오기
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading } = useGetFeedbacks(docId);
  const createMutation = useCreateFeedback();

  const { register, handleSubmit, reset } = useForm<Feedback>({
    mode: "onSubmit",
  });

  const onSubmitFeedback = async (data: Feedback) => {
    if (data === undefined) return;
    try {
      await createMutation.mutate({
        docId,
        feedback: {
          id: data.id,
          userId: data.userId,
          content: data.content,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      reset({ content: "" });
      setIsContent(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 등록되지 않았습니다.");
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsContent(e.currentTarget.value.trim().length > 1);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section className="flex flex-col p-5 gap-5 relative">
        {data?.map(feedback => {
          return (
            <Card key={feedback.id} vertical={true}>
              <FeedbackCard feedback={feedback} docId={docId} />
            </Card>
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
              onChange={onChangeInput}
            />
            {/* input 길이(공백은 제외)가 2이상부터는 button 활성화 */}
            <button
              type="submit"
              className={`text-[14px] rounded-[5px] px-8 py-1 ${
                !isContent
                  ? " text-gray-300 bg-gray-100 disabled cursor-not-allowed"
                  : " text-gray-50 bg-primary-80"
              }`}
            >
              업로드
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

export default Feedback;
