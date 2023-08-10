import ModalWrapper from "@/components/ModalWrapper";
import React from "react";
import AssignmentLinkSubmitModal from "./AssignmentLinkSubmitModal";
import AssignmentFileSubmitModal from "./AssignmentFileSubmitModal";
import Image from "next/image";
import { User } from "@/types/firebase.types";
import { useGetSubmittedAssignmentId } from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignementId";
import useModal from "@/hooks/common/useModal";
import SubmittedAssignmentDetail from "./SubmittedAssignmentDetail";
import { useAppSelector } from "@/redux/store";

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
  const { isModalOpen: isLinkModalOpen, handleModal: handleLinkModal } =
    useModal();
  const { isModalOpen: isFileModalOpen, handleModal: handleFileModal } =
    useModal();
  const { isModalOpen: isDetailModalOpen, handleModal: handleDetailModal } =
    useModal();

  const { isLoading, data: submittedAssignmentId } =
    useGetSubmittedAssignmentId(assignmentId, userId);

  const userData = useAppSelector(state => state.userInfo);

  if (isLoading) return <div></div>;
  return (
    <div>
      <div className="flex justify-between items-center p-6 border border-grayscale-10 rounded-[10px]">
        <div className="flex justify-start items-center gap-[14px]">
          <div
            className={`w-[43px] h-[43px] flex justify-center items-center border border-gray-100 rounded-full${
              profileImage ? " relative overflow-hidden" : ""
            }`}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필사진"
                fill
                objectFit="cover"
              />
            ) : (
              <Image
                src={"/images/logo.svg"}
                alt="프로필사진"
                width={21.51}
                height={11.57}
              />
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center gap-[6px]">
              <span className="font-bold text-base">{username}</span>
              <div className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <span className="text-grayscale-40 text-base">{role}</span>
            </div>
            <div className="w-fit text-[10px] py-1 px-[10px] bg-grayscale-5 text-grayscale-60 rounded">
              {submittedAssignmentId ? "제출 완료" : "제출 전"}
            </div>
          </div>
        </div>
        {submittedAssignmentId ? (
          <button
            onClick={handleDetailModal}
            className="flex justify-center items-center w-[115px] h-[35px] text-sm font-medium bg-primary-80 text-white rounded-[7px]"
          >
            확인하기
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleFileModal}
              className="flex justify-center items-center w-[115px] h-[35px] text-sm font-medium bg-grayscale-5 text-grayscale-60 rounded-[7px]"
            >
              파일 첨부
            </button>
            <button
              onClick={handleLinkModal}
              className="flex justify-center items-center w-[115px] h-[35px] text-sm font-medium bg-grayscale-5 text-grayscale-60 rounded-[7px]"
            >
              링크
            </button>
          </div>
        )}
      </div>
      {isLinkModalOpen && (
        <ModalWrapper onCloseModal={handleLinkModal}>
          <AssignmentLinkSubmitModal
            assignmentId={assignmentId}
            handleModalState={handleLinkModal}
            userId={userId}
          />
        </ModalWrapper>
      )}
      {isFileModalOpen && (
        <ModalWrapper onCloseModal={handleFileModal}>
          <AssignmentFileSubmitModal
            assignmentId={assignmentId}
            handleModalState={handleFileModal}
            userId={userId}
          />
        </ModalWrapper>
      )}
      {isDetailModalOpen && (
        <ModalWrapper onCloseModal={handleDetailModal}>
          <SubmittedAssignmentDetail
            docId={submittedAssignmentId || ""}
            userData={userData}
            handleModal={handleDetailModal}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default StudentAssignmentSubmitCard;
