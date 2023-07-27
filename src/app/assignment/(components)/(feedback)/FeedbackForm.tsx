import useCreateFeedback from "@/hooks/reactQuery/useCreateFeedback";
import { Feedback } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FeedbackFormProps {
  docId: string;
}

type CreateFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

const FeedbackForm = ({ docId }: FeedbackFormProps) => {
  const [isContent, setIsContent] = useState(false);
  const createMutation = useCreateFeedback();

  const { register, handleSubmit, reset } = useForm<CreateFeedback>({
    mode: "onSubmit",
  });

  const onSubmitFeedback = async (data: CreateFeedback) => {
    if (data === undefined) return;
    try {
      await createMutation.mutate({
        docId,
        feedback: {
          //   로그인한 유저 id 보내기
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

  return (
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
          className="w-[80%] placeholder-grayscale-20"
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
  );
};

export default FeedbackForm;
