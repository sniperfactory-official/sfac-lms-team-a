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
      {/* 버튼에 마우스가 올라갈 때 prefetch 필요함 (모달이 뜨기 전에 데이터 패치 필요 (로딩 스피너가 보이기 때문에)) */}
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
