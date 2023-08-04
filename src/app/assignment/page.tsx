"use client";

import React, { useState } from "react";
import AssignmentDetail from "./(components)/AssignmentDetail";
import ModalWrapper from "@/components/ModalWrapper";
import Modal from "./(components)/(assignmentCreateModal)/Modal";
import AssignmentRollCheck from "./(components)/(list)/AssignmentRollCheck";

const AssignmentPage = () => {
  return (
    <div className="">
      {/* <div className="border border-red"> */}
      {/* <div>
        <AssignmentDetail />
      </div> */}
      <AssignmentRollCheck />
      {/* <button onClick={() => setModal(!modal)}>button</button> */}
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
