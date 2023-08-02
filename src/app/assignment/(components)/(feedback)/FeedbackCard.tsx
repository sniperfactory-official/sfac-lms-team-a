import Image from "next/image";
import VerificationModal from "./VerificationModal";
import { useEffect, useRef, useState } from "react";
import { FeedbackCardProps } from "@/types/feedback.types";
import FeedbackTextArea from "./FeedbackTextArea";
import FeedbackButton from "./FeedbackButton";
import useMutateFeedback from "@/hooks/reactQuery/feedback/useMutateFeedback";

const FeedbackCard = ({
  feedback,
  docId,
  isEdit,
  setIsEdit,
  isModalOn,
  setIsModalOn,
  isFeedback,
  userData,
  userId,
} // setIsFeedback,
: FeedbackCardProps) => {
  const {
    isContent,
    setIsContent,
    handleDeleteFeedback,
    handleSubmitFeedback,
    handleUpdateFeedback,
    useFeedbackForm,
  } = useMutateFeedback(docId, userId, feedback, setIsEdit);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleSubmit, setValue, resetField } = useFeedbackForm;
  // useEffect(() => {
  //   if (feedback === undefined) return;
  //   setValue("content", feedback.content);
  // }, [feedback, resetField]);
  const handleModalOn = (id: string) => {
    setIsModalOn(prevId => (prevId === id ? null : id));
    setIsEdit(prevId => (prevId !== id ? null : id));
  };

  const handleChangeToUpdate = (id: string) => {
    console.log(`수정상태: ${isEdit}, 피드백상태:${isFeedback}`);
    setIsContent(false);
    // setIsFeedback(prev => !prev);
    setIsEdit(prevId => (prevId === id ? null : id));
    resetField("content", { defaultValue: feedback?.content });
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={
          !isEdit
            ? handleSubmit(handleSubmitFeedback)
            : handleSubmit(handleUpdateFeedback)
        }
      >
        <section className="flex gap-2 w-[100%] items-start">
          <div className="flex justify-center flex-shrink-0 w-[43px] h-[43px] mt-[5px] border border-gray-100 rounded-full">
            <Image
              src={
                !isFeedback
                  ? userData?.profileImage || "/images/logo.svg"
                  : feedback?.user?.profileImage || "/images/logo.svg"
              }
              alt="프로필사진"
              width={21.51}
              height={11.57}
            />
          </div>
          <section className="flex flex-col gap-2 w-[100%]">
            <section className="flex items-center justify-between">
              <section className="flex gap-3">
                <span className="font-bold">
                  {!isFeedback ? userData?.username : feedback?.user?.username}
                </span>
                <span className="text-grayscale-40">
                  {!isFeedback ? userData?.role : feedback?.user?.role}
                </span>
              </section>
              {!isEdit && isFeedback && feedback?.userId.id === userId && (
                <section className="text-[12px]">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleChangeToUpdate(feedback.id)}
                    id={feedback.id}
                  >
                    수정
                  </span>{" "}
                  |{" "}
                  <span
                    className="cursor-pointer"
                    id={feedback.id}
                    onClick={() => handleModalOn(feedback.id)}
                  >
                    삭제
                  </span>
                </section>
              )}
            </section>
            <FeedbackTextArea
              // setIsFeedback={setIsFeedback}
              isFeedback={isFeedback}
              isEdit={isEdit}
              setIsContent={setIsContent}
              setIsEdit={setIsEdit}
              useFeedbackForm={useFeedbackForm}
              handleMutateFeedback={
                !isEdit ? handleSubmitFeedback : handleUpdateFeedback
              }
              textAreaRef={textAreaRef}
              feedback={feedback}
            />
          </section>
        </section>
        <FeedbackButton
          isFeedback={isFeedback}
          isEdit={isEdit}
          textAreaRef={textAreaRef}
          isContent={isContent}
          handleChangeToUpdate={handleChangeToUpdate}
          feedback={feedback}
        />
      </form>

      {isModalOn && (
        <VerificationModal
          handleModalOn={handleModalOn}
          handleDeleteFeedback={handleDeleteFeedback}
          id={feedback?.id || ""}
        />
      )}
    </>
  );
};

export default FeedbackCard;
