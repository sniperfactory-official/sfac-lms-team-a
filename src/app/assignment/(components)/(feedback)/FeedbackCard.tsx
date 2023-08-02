import Image from "next/image";
import VerificationModal from "./VerificationModal";
import { Timestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { UserFeedback } from "./Feedback";
import { FeedbackCardProps } from "@/types/feedback.types";
import { useFeedbackActions } from "@/hooks/reactQuery/feedback/useFeedbackActions";
import { useReturnToUserRef } from "@/hooks/reactQuery/feedback/useReturnToUserRef";
import FeedbackTextArea from "./FeedbackTextArea";
import { useForm } from "react-hook-form";

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
}: FeedbackCardProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { register, reset, handleSubmit, setValue, trigger } =
    useForm<UserFeedback>({
      mode: "onSubmit",
      defaultValues: {
        content: feedback?.content,
      },
    });
  const { createFeedback, deleteFeedback, updateFeedback, updateError } =
    useFeedbackActions();
  const [isContent, setIsContent] = useState(false);

  const handleModalOn = (id: string) => {
    setIsModalOn(prevId => (prevId === id ? null : id));
  };

  const handleDeleteFeedback = (e: React.MouseEvent) => {
    deleteFeedback({
      docId,
      feedbackId: e.currentTarget.id,
    });
  };

  const onSubmitFeedback = async (data: UserFeedback) => {
    console.log(data, "데이터 입력!");
    if (data === undefined) return;

    try {
      await createFeedback({
        docId,
        feedback: {
          //   로그인한 유저 id 보내기
          userId: useReturnToUserRef(userId),
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

  const handleUpdateFeedback = async (data: UserFeedback) => {
    if (feedback === undefined) {
      console.log("feedback이 읽히지 않았습니다.");
      return;
    }

    console.log(data, "데이터 입력!");

    try {
      await updateFeedback({
        docId,
        feedbackId: feedback.id,
        feedback: {
          //   로그인한 유저 id 보내기
          userId: feedback.userId,
          content: data.content,
          createdAt: feedback.createdAt,
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      // reset({ content: "" });
      setIsEdit(null);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 수정되지 않았습니다.");
      console.log(updateError?.message);
    }
  };

  const handleChangeToUpdate = (id: string) => {
    setIsContent(false);
    setIsEdit(prevId => (prevId === id ? null : id));
  };

  const SubmitButton = (
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
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={
          !isEdit
            ? handleSubmit(onSubmitFeedback)
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
                    onClick={() => handleChangeToUpdate(feedback?.id || "")}
                    id={feedback?.id}
                  >
                    수정
                  </span>{" "}
                  |{" "}
                  <span
                    className="cursor-pointer"
                    id={feedback?.id}
                    onClick={() => handleModalOn(feedback?.id || "")}
                  >
                    삭제
                  </span>
                </section>
              )}
            </section>
            <FeedbackTextArea
              isFeedback={isFeedback}
              register={register}
              handleSubmit={handleSubmit}
              setIsContent={setIsContent}
              isEdit={isEdit}
              feedback={feedback}
              setIsEdit={setIsEdit}
              setValue={setValue}
              trigger={trigger}
              reset={reset}
              handleSubmitFeedback={
                !isEdit ? onSubmitFeedback : handleUpdateFeedback
              }
              textAreaRef={textAreaRef}
            />
          </section>
        </section>
        {isFeedback ? (
          isEdit && (
            <div className="w-[100%] flex justify-end items-end gap-[10px]">
              <button
                type="button"
                onClick={() => handleChangeToUpdate(feedback?.id || "")}
                className="h-[35px] text-[14px] px-8 py-1 text-grayscale-60 bg-grayscale-5 rounded-[5px]"
              >
                취소하기
              </button>
              {SubmitButton}
            </div>
          )
        ) : (
          <div className="w-[100%] flex justify-end items-end gap-[10px]">
            {SubmitButton}
          </div>
        )}
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