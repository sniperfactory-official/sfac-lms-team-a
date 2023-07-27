"use client";

import useDeleteFeedback from "@/hooks/reactQuery/useDeleteFeedback";
import { Feedback } from "@/types/firebase.types";
import Image from "next/image";
import { useState } from "react";
import VerificationModal from "./VerificationModal";
import { getTime } from "@/utils/getTime";

interface FeedbackCardProps {
  feedback: Feedback;
  docId: string;
}

const FeedbackCard = ({ feedback, docId }: FeedbackCardProps) => {
  const [isModalOn, setIsModalOn] = useState(false);
  const deleteMutation = useDeleteFeedback();
  const handleModalOn = () => {
    setIsModalOn(prev => !prev);
  };

  const handleDeleteFeedback = (e: React.MouseEvent) => {
    deleteMutation.mutate({
      docId,
      feedbackId: e.currentTarget.id,
    });
    // console.dir(e.currentTarget.id);
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

        <section className="text-[12px]">
          <span className="cursor-pointer">수정</span> |{" "}
          <span
            className="cursor-pointer"
            id={feedback.id}
            onClick={handleModalOn}
          >
            삭제
          </span>
        </section>
      </section>
      <div className="pt-5 pl-2 text-[12px]">{feedback.content}</div>
      <small className="flex justify-end text-[12px] text-grayscale-40">
        {getTime(feedback.createdAt.toDate())}
      </small>

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
