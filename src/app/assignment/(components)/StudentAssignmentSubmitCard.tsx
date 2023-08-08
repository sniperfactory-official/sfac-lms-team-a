import ModalWrapper from "@/components/ModalWrapper";
import React, { useState } from "react";
import AssignmentLinkSubmitModal from "./AssignmentLinkSubmitModal";
import AssignmentFileSubmitModal from "./AssignmentFileSubmitModal";
import Image from "next/image";
import { User } from "@/types/firebase.types";

interface StudentAssignmentSubmitCardProps {
  userId: User["id"];
  role: User["role"];
  username: User["username"];
  profileImage: User["profileImage"];
  assignmentId: string;
}

const StudentAssignmentSubmitCard = ({
  assignmentId,
  role,
  username,
  userId,
  profileImage,
}: StudentAssignmentSubmitCardProps) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);

  const handleLinkModalState = () => {
    setIsFileModalOpen(false);
    setIsLinkModalOpen(prev => !prev);
  };

  const handleFileModalState = () => {
    setIsLinkModalOpen(false);
    setIsFileModalOpen(prev => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6 border border-grayscale-10 rounded-[10px]">
        <div className="flex justify-start items-center gap-[14px]">
          <div className="w-[43px] h-[43px] flex justify-center items-center border border-gray-100 rounded-full">
            <Image
              src={profileImage || "/images/logo.svg"}
              alt="프로필사진"
              width={21.51}
              height={11.57}
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center gap-[6px]">
              <span className="font-bold text-base">{username}</span>
              <div className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <span className="text-grayscale-40 text-base">{role}</span>
            </div>
            <div className="w-fit text-[10px] py-1 px-[10px] bg-grayscale-5 text-grayscale-60 rounded">
              제출 전
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleFileModalState}
            className="flex justify-center items-center w-[115px] h-[35px] text-sm font-medium bg-grayscale-5 text-grayscale-60 rounded-[7px]"
          >
            파일 첨부
          </button>
          <button
            onClick={handleLinkModalState}
            className="flex justify-center items-center w-[115px] h-[35px] text-sm font-medium bg-grayscale-5 text-grayscale-60 rounded-[7px]"
          >
            링크
          </button>
        </div>
      </div>
      {isLinkModalOpen && (
        <ModalWrapper onCloseModal={handleLinkModalState}>
          <AssignmentLinkSubmitModal
            assignmentId={assignmentId}
            handleModalState={handleLinkModalState}
            userId={userId}
          />
        </ModalWrapper>
      )}
      {isFileModalOpen && (
        <ModalWrapper onCloseModal={handleFileModalState}>
          <AssignmentFileSubmitModal
            assignmentId={assignmentId}
            handleModalState={handleFileModalState}
            userId={userId}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default StudentAssignmentSubmitCard;
