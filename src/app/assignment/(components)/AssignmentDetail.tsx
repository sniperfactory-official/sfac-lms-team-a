"use client";
import ModalWrapper from "@/components/ModalWrapper";
import React, { useState } from "react";
import Feedback from "./(feedback)/Feedback";

const AssignmentDetail = () => {
  const [isModalOn, setIsModalOn] = useState(false);
  const handleModalOn = () => {
    setIsModalOn(prev => !prev);
  };
  return (
    <div>
      <button
        onClick={handleModalOn}
        className="bg-blue-600 text-white rounded-[8px] p-3"
      >
        피드백 모달 테스트용
      </button>
      {/* logic comment
        학생 submittedAssignments map으로 불러오고,
        해당 과제 클릭하면 아래의 모달이 열려야함.
        그리고 클릭할 때 submittedAssignment id를 feedback 컴포넌트로 전달
      */}
      {isModalOn && (
        <ModalWrapper handleModal={handleModalOn}>
          <Feedback />
        </ModalWrapper>
      )}
    </div>
  );
};

export default AssignmentDetail;
