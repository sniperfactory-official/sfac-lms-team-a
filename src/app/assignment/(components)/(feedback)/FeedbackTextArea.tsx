import { FeedbackTextAreaProps } from "@/types/feedback.types";
import { getTime } from "@/utils/getTime";
import { Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";

const FeedbackTextArea = ({
  register,
  handleSubmit,
  setIsContent,
  isEdit,
  feedback,
  setIsEdit,
  isFeedback,
  handleSubmitFeedback,
  trigger,
  setValue,
  textAreaRef,
  reset,
}: FeedbackTextAreaProps) => {
  useEffect(() => {
    if (textAreaRef.current !== null) {
      //   textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef]);

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsContent(e.currentTarget.value.trim() !== "");
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleTextArea = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    setIsEdit(null);
  };

  const handleSubmitEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value.length, e.currentTarget.style.height);
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.currentTarget.value.trim() !== ""
    ) {
      if (!e.nativeEvent.isComposing) {
        e.preventDefault();
        setValue("content", e.currentTarget.value);
        trigger("content");
        handleSubmit(handleSubmitFeedback)();
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

  //   console.log(feedback);
  return (
    <>
      {isFeedback ? (
        <div className="flex justify-between relative">
          <textarea
            {...rest}
            ref={e => {
              ref(e);
              textAreaRef.current = e;
            }}
            onChange={onChangeInput}
            onKeyDown={handleSubmitEnter}
            disabled={isEdit ? false : true}
            defaultValue={feedback?.content}
            // tailwind style로는 먹히지 않고 직접 style로 입력해야 높이가 먹히는 에러가 있음.
            style={{ height: "17px" }}
            className={`resize-none mb-1  max-h-[260px] overflow-y-hidden text-[14px] placeholder-black whitespace-pre-wrap disabled:bg-white ${
              isEdit ? "w-[100%]" : "w-[96%]"
            }`}
            maxLength={500}
          />

          {!isEdit && (
            <small className="text-[12px] text-grayscale-40 absolute right-0 bottom-0">
              {getTime(
                feedback?.createdAt.toDate() ||
                  Timestamp.fromDate(new Date()).toDate(),
              )}
            </small>
          )}
        </div>
      ) : (
        <textarea
          {...rest}
          ref={e => {
            ref(e);
            textAreaRef.current = e;
          }}
          onChange={onChangeInput}
          onKeyDown={handleSubmitEnter}
          onMouseUp={e => {
            if (!isEdit) {
              handleTextArea(e);
            }
          }}
          defaultValue={""}
          placeholder="댓글을 입력해주세요."
          className={`text-[14px] w-[100%] max-h-[260px] block resize-none mb-1 overflow-y-hidden  ${
            !isEdit ? "disabled" : "placeholder-grayscale-20"
          }`}
          rows={1}
          maxLength={500}
        />
      )}
    </>
  );
};

export default FeedbackTextArea;
