"use client";

import React, { useState } from "react";
import AssignmentDetail from "./(components)/AssignmentDetail";
import ModalWrapper from "@/components/ModalWrapper";
import Modal from "./(components)/(assignmentCreateModal)/Modal";
import { useAppSelector } from "@/redux/store";

const AssignmentPage = () => {
  const [modal, setModal] = useState(false);
  const userId = useAppSelector(state => state.userId.uid);
  console.log(userId)
  const handleModal = () => {
    console.log(modal);
    setModal(!modal);
  };

  return (
    <div>
      <div>
        <AssignmentDetail />
      </div>
      <button onClick={() => setModal(!modal)}>button</button>
      {modal && (
        <ModalWrapper modalTitle="과제 만들기" onCloseModal={handleModal}>
          <Modal userId={userId}></Modal>
        </ModalWrapper>
      )}
      {/* {data?.map(assignment => {
        console.log("1")
        return (
          <div>
            {assignment.content}
          </div>
        )
      })} */}
    </div>
  );
};

export default AssignmentPage;
