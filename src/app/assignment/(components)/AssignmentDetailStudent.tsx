import ModalWrapper from "@/components/ModalWrapper";
import React, { useState } from "react";
import AssignmentLinkSubmitModal from "./AssignmentLinkSubmitModal";
import { useAppSelector } from "@/redux/store";
import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";
import AssignmentFileSubmitModal from "./AssignmentFileSubmitModal";

const AssignmentDetailStudent = () => {
  const userId = useAppSelector(state => state.userId.uid);
  const { data: userData } = fetchUserInfo(userId);

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
      <button
        onClick={handleLinkModalState}
        className="bg-blue-600 text-white rounded-[8px] p-3"
      >
        과제 링크 제출
      </button>
      <button
        onClick={handleFileModalState}
        className="bg-blue-600 text-white rounded-[8px] p-3"
      >
        과제 파일 제출
      </button>
      {isLinkModalOpen && (
        <ModalWrapper onCloseModal={handleLinkModalState}>
          <AssignmentLinkSubmitModal handleModalState={handleLinkModalState} />
        </ModalWrapper>
      )}
      {isFileModalOpen && (
        <ModalWrapper onCloseModal={handleFileModalState}>
          <AssignmentFileSubmitModal handleModalState={handleFileModalState} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default AssignmentDetailStudent;
