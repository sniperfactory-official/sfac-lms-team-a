import { FeedbackTextAreaProps } from "@/types/feedback.types";
import { getTime } from "@/utils/getTime";
import { Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";

const FeedbackTextArea = ({
  setIsContent,
  isEdit,
  feedback,
  isFeedback,
  handleMutateFeedback,
  textAreaRef,
  useFeedbackForm,
}: FeedbackTextAreaProps) => {
  const { register, handleSubmit, setValue, trigger, watch } = useFeedbackForm;

  useEffect(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef]);

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsContent(e.currentTarget.value.trim() !== "");
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleSubmitEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.currentTarget.value.trim() !== ""
    ) {
      if (!e.nativeEvent.isComposing) {
        e.preventDefault();
        setValue("content", e.currentTarget.value);
        watch("content");
        trigger("content");
        handleSubmit(handleMutateFeedback)();
        if (!isFeedback && textAreaRef.current) {
          textAreaRef.current.style.height = "24px";
        }
      }
    }
  };

  const { ref, ...rest } = register("content", {
    required: "내용을 입력해주세요.",
    maxLength: 500,
  });

  const textAreaProps = {
    ref: (e: HTMLTextAreaElement | null) => {
      ref(e);
      textAreaRef.current = e;
    },
    onKeyDown: handleSubmitEnter,
    disabled: isFeedback && !isEdit,
    defaultValue: isFeedback ? feedback?.content : "",
    placeholder: isFeedback ? "" : "댓글을 입력해주세요.",
    className: `resize-none max-h-[260px] leading-[16.8px] overflow-y-hidden text-[14px] whitespace-pre-wrap disabled:bg-white focus:outline-none ${
      isFeedback ? (isEdit ? "w-[100%]" : "w-[96%]") : "w-[100%]"
    } ${isFeedback ? "placeholder-black" : "placeholder-grayscale-20"}`,
    rows: 1,
    maxLength: 500,
    ...rest,
    onChange: onChangeInput,
  };

  return (
    <>
      <div
        className={`flex justify-between relative ${isFeedback ? "" : "block"}`}
      >
        <textarea {...textAreaProps} />
        {isFeedback && !isEdit && (
          <small className="text-[12px] text-grayscale-40 absolute right-0 bottom-[-5px]">
            {getTime(
              feedback?.createdAt.toDate() ||
                Timestamp.fromDate(new Date()).toDate(),
            )}
          </small>
        )}
      </div>
    </>
  );
};

export default FeedbackTextArea;
