import { FeedbackButtonProps } from "@/types/feedback.types";
import React from "react";

const FeedbackButton = ({
  isFeedback,
  textAreaRef,
  isContent,
  isEdit,
  handleChangeToUpdate,
  feedback,
}: FeedbackButtonProps) => {
  const Button = (
    <button
      type="submit"
      onClick={() => {
        if (!isFeedback && textAreaRef.current) {
          textAreaRef.current.style.height = "24px";
        }
      }}
      className={`h-[35px] text-[14px] rounded-[5px] px-8 py-1 ${
        !isContent
          ? " text-gray-300 bg-gray-100 disabled cursor-not-allowed"
          : " text-gray-50 bg-primary-80"
      }`}
    >
      {!isEdit ? "업로드" : "수정하기"}
    </button>
  );

  return (
    <div className="w-[100%] flex justify-end items-end gap-[10px]">
      {isFeedback ? (
        isEdit && (
          <>
            <button
              type="button"
              onClick={() => {
                handleChangeToUpdate(feedback?.id || "");
                isFeedback = true;
              }}
              className="h-[35px] text-[14px] px-8 py-1 text-grayscale-60 bg-grayscale-5 rounded-[5px]"
            >
              취소하기
            </button>
            {Button}
          </>
        )
      ) : (
        <>{Button}</>
      )}
    </div>
  );
};

export default FeedbackButton;
