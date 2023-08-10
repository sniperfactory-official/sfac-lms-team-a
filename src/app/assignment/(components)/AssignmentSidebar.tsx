"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Assignment, User } from "@/types/firebase.types";
import { useUpdateAssignmentsOrder } from "@/hooks/reactQuery/assignment/useUpdateAssignmentOrder";
import { useDeleteAssignments } from "@/hooks/reactQuery/assignment/useDeleteAssignments";
import useHandleListCheck from "@/hooks/common/useHandleListCheck";
import ModalWrapper from "@/components/ModalWrapper";
import Modal from "./(assignmentCreateModal)/Modal";
import AssignmentSidebarButtons from "./(assignmentlist)/AssignmentSidebarButtons";

interface AssignmentSidebarProps {
  list: Assignment[];
  userId: string;
  role: string;
  // role: User["role"];
}

const AssignmentSidebar = ({ list, userId, role }: AssignmentSidebarProps) => {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>(list);
  const [isEdit, setIsEdit] = useState(false);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [modal, setModal] = useState(false);

  const { mutateAsync: updateMutate, isLoading: updateIsLoading } =
    useUpdateAssignmentsOrder();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteAssignments();

  const handleModal = () => setModal(!modal);
  const { checkedList, handleListCheck } = useHandleListCheck([]);

  const deleteCheckList = () => {
    if (checkedList.length === 0) return;
    const beforeCheck = confirm("선택된 과제를 삭제하시겠습니까??");
    if (beforeCheck) {
      if (checkedList) {
        deleteMutate(checkedList);
        const newAssignmentList = assignmentList.filter(
          (assignment: Assignment) => !checkedList.includes(assignment.id),
        );
        setAssignmentList(newAssignmentList);
      }
    }
  };

  const updateAssignment = async () => {
    if (isOrderChanged) {
      await updateMutate(assignmentList);
      setIsOrderChanged(!isOrderChanged);
    }
    setIsEdit(!isEdit);
  };
  const getDraggedList = (newList: Assignment[]) => {
    // console.log("@드래그끝났을떄", newList);
    setAssignmentList(newList);
    setIsOrderChanged(true);
  };
  useEffect(() => {
    if (!isOrderChanged) {
      setAssignmentList(list);
    }
  }, [list]);
  return (
    <aside>
      <div className="relative">
        {(deleteIsLoading || updateIsLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500" />
          </div>
        )}
        <Sidebar
          header={"전체 과제"}
          contents={assignmentList}
          isEdit={isEdit}
          lectureCheckHandler={handleListCheck}
          onDragEnd={getDraggedList}
          isAssignmentSidebar={true}
        />
        {role === "관리자" && (
          <AssignmentSidebarButtons
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            updateAssignment={updateAssignment}
            deleteCheckList={deleteCheckList}
            handleModal={handleModal}
          />
        )}
      </div>

      {modal && (
        <ModalWrapper modalTitle="과제 만들기" onCloseModal={handleModal}>
          <Modal
            isCreateModal={true}
            onCloseModal={handleModal}
            userId={userId}
          />
        </ModalWrapper>
      )}
    </aside>
  );
};

export default AssignmentSidebar;
