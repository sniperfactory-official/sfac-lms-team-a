import { FeedbackCreateProps } from "@/types/feedback.types";
import React from "react";

const FeedbackCreate: React.FC<FeedbackCreateProps> = ({
  useFeedbackForm,
  onSubmitFeedback,
  onChangeInput,
  isContent,
}) => {
  return (
    <form
      className="flex justify-between items-end"
      onSubmit={useFeedbackForm.handleSubmit(onSubmitFeedback)}
    >
      <textarea
        {...useFeedbackForm.register("content", {
          required: "내용을 입력해주세요.",
          maxLength: 500,
        })}
        placeholder="댓글을 입력해주세요."
        className="block w-[80%] placeholder-grayscale-20 resize-none leading-[2rem]"
        onChange={onChangeInput}
        rows={1}
        maxLength={500}
      />
      {/* input 길이(공백은 제외)가 2이상부터는 button 활성화 */}
      <button
        type="submit"
        className={`h-[35px] text-[14px] rounded-[5px] px-8 py-1 ${
          !isContent
            ? " text-gray-300 bg-gray-100 disabled cursor-not-allowed"
            : " text-gray-50 bg-primary-80"
        }`}
      >
        업로드
      </button>
    </form>
  );
};

export default FeedbackCreate;
