import { FeedbackTextAreaProps } from "@/types/feedback.types";
import { getTime } from "@/utils/getTime";
import { Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";

const FeedbackTextArea = ({
  setIsContent,
  isEdit,
  feedback,
  setIsEdit,
  isFeedback,
  handleMutateFeedback,
  textAreaRef,
  useFeedbackForm,
}: FeedbackTextAreaProps) => {
  const { register, handleSubmit, setValue, trigger, resetField, watch } =
    useFeedbackForm;

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

  // const handleTextArea = () => {
  //   console.log(`수정상태: ${isEdit}, 피드백상태:${isFeedback}`);
  //   // setIsFeedback(false);

  //   setIsEdit(null);
  //   // if (!isFeedback && isEdit) {
  //   //   resetField("content", { defaultValue: feedback?.content });
  //   // }
  // };

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
            rows={1}
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
          // onMouseUp={handleTextArea}
          // disabled={isFeedback ? true : false}
          defaultValue={""}
          placeholder="댓글을 입력해주세요."
          className={`text-[14px] w-[100%] max-h-[260px] block resize-none mb-1 overflow-y-hidden placeholder-grayscale-20`}
          rows={1}
          maxLength={500}
        />
      )}
    </>
  );
};

export default FeedbackTextArea;
