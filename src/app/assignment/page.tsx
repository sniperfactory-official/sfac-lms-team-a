"use client";

import React, { useState } from "react";
import AssignmentDetail from "./(components)/AssignmentDetail";
import ModalWrapper from "@/components/ModalWrapper";
import Modal from "./(components)/(assignmentCreateModal)/Modal";

const AssignmentPage = () => {
  const [modal, setModal] = useState(false);
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
          <Modal onCloseModal={handleModal} />
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
