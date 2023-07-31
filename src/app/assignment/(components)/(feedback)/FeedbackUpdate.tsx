import React from "react";
import { FeedbackUpdateProps } from "@/types/feedback.types";

const FeedbackUpdate = ({
  useFeedbackForm,
  feedback,
  handleUpdateFeedback,
  handleChangeToUpdate,
}: FeedbackUpdateProps) => {
  return (
    <form
      className="flex justify-between"
      onSubmit={useFeedbackForm.handleSubmit(handleUpdateFeedback)}
    >
      <textarea
        {...useFeedbackForm.register("content", {
          required: "내용을 입력해주세요.",
          maxLength: 500,
        })}
        placeholder={feedback.content}
        defaultValue={feedback.content}
        className="ml-2 mt-6 h-[38px] text-[12px] block w-[80%] placeholder-black resize-none leading-[1.125rem]"
        maxLength={500}
      />
      <div className="w-[100%] flex justify-end items-end gap-[10px]">
        <button
          type="button"
          onClick={handleChangeToUpdate}
          className="py-2 px-7 text-grayscale-60 bg-grayscale-5 rounded-[5px]"
        >
          취소하기
        </button>
        <button
          type="submit"
          className="py-2 px-7 text-white bg-primary-80 rounded-[5px]"
        >
          수정하기
        </button>
      </div>
    </form>
  );
};

export default FeedbackUpdate;
