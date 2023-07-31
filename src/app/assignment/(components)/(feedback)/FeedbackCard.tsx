import React, { useState } from "react";
import useDeleteFeedback from "@/hooks/reactQuery/useDeleteFeedback";
import Image from "next/image";
import VerificationModal from "./VerificationModal";
import { getTime } from "@/utils/getTime";
import { FeedbackCardProps } from "@/types/feedback.types";
import FeedbackUpdate from "./FeedbackUpdate";
import { UserFeedback } from "./Feedback";
import useUpdateFeedback from "@/hooks/reactQuery/useUpdateFeedback";
import { Timestamp } from "firebase/firestore";

const FeedbackCard = ({
  feedback,
  docId,
  useFeedbackForm,
  // isEdit,
  // setIsEdit,
  isModalOn,
  setIsModalOn,
}: FeedbackCardProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const deleteMutation = useDeleteFeedback();
  const updateMutation = useUpdateFeedback();

  const handleModalOn = (id: string) => {
    setIsModalOn(prevId => (prevId === id ? null : id));
  };

  const handleDeleteFeedback = (e: React.MouseEvent) => {
    deleteMutation.mutate({
      docId,
      feedbackId: e.currentTarget.id,
    });
  };

  // const handleChangeToUpdate = (id: string) => {
  //   setIsEdit(prevId => (prevId === id ? null : id));
  // };

  const handleChangeToUpdate = () => {
    setIsEdit(prev => !prev);
  };

  const handleUpdateFeedback = async (data: UserFeedback) => {
    if (data === undefined) return;

    try {
      await updateMutation.mutate({
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
      useFeedbackForm.reset({ content: "" });
      setIsEdit(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 등록되지 않았습니다.");
      console.log(updateMutation.error);
    }
  };

  return (
    <>
      <section className="flex justify-between items-center">
        <section className="flex gap-2 items-center">
          <div className="flex justify-center w-[43px] h-[43px] border border-gray-100 rounded-full">
            <Image
              src={feedback.user?.profileImage || "/images/logo.svg"}
              alt="프로필사진"
              width={21.51}
              height={11.57}
            />
          </div>

          <span className="font-bold">{feedback.user?.username}</span>
          <span className="text-grayscale-40">
            {feedback.user?.role !== "수강생" ? "멘토" : "수강생"}
          </span>
        </section>
        {!isEdit ? (
          <section className="text-[12px]">
            <span
              className="cursor-pointer"
              // onClick={() => handleChangeToUpdate(feedback.id)}
              onClick={handleChangeToUpdate}
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
        ) : (
          <></>
        )}
      </section>
      {!isEdit ? (
        <>
          <pre className="pt-5 pl-2 text-[12px] tracking-[-2%]">
            {feedback.content}
          </pre>
          <small className="flex justify-end text-[12px] text-grayscale-40 w">
            {getTime(feedback.createdAt.toDate())}
          </small>
        </>
      ) : (
        <FeedbackUpdate
          handleChangeToUpdate={handleChangeToUpdate}
          feedback={feedback}
          useFeedbackForm={useFeedbackForm}
          handleUpdateFeedback={handleUpdateFeedback}
        />
      )}

      {isModalOn && (
        <VerificationModal
          handleModalOn={handleModalOn}
          handleDeleteFeedback={handleDeleteFeedback}
          id={feedback.id}
        />
      )}
    </>
  );
};

export default FeedbackCard;
