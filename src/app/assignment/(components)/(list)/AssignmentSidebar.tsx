"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar, { Content } from "@/components/Sidebar";
import { Assignment } from "@/types/firebase.types";
import Modal from "../(assignmentCreateModal)/Modal";
import ModalWrapper from "@/components/ModalWrapper";
import Vector from "/public/images/Vector.svg";
import Edit from "/public/images/Edit.svg";

// Sidebar 컴포넌트에 전달되어야 하는 데이터 예시입니다.
// const assignmentDummy = [
//   { id: "1", title: "LisTile 커스텀 위젯 만들기", order: 1 },
//   { id: "2", title: "HTTP 리퀘스트 만들기", order: 2 },
//   { id: "3", title: "LisTile 커스텀 위젯 만들기", order: 3 },
// ];

// 상위 컴포넌트에서 전달이 필요할 것으로 예상되는 props를 예시로 설정하였으며, 상황에 맞게 수정하신 후 사용해주세요!
interface AssignmentSidebarProps {
  list: Assignment[];
  getUpdateList?: (arr: Assignment[]) => void;
}

const AssignmentSidebar = ({ list, getUpdateList }: AssignmentSidebarProps) => {
  const [assignmentList, setAssignmentList] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const handleModal = () => {
    console.log(modal);
    setModal(!modal);
  };

  const handleListCheck = (id: string) => {
    setCheckedList(prevList => {
      if (prevList.includes(id)) {
        return prevList.filter(item => item !== id);
      }
      return [...prevList, id];
    });
  };

  const deleteCheckList = () => {
    console.log(123);

    if (checkedList) {
      const newAssignmentList = assignmentList.filter(
        (assignment: Assignment) => !checkedList.includes(assignment.id),
      );
      console.log(newAssignmentList);
      setAssignmentList(newAssignmentList);
      getUpdateList(newAssignmentList);
    }
    setIsEdit(!isEdit);
  };
  const whenDragEnd = (newList: any[]) => {
    console.log("@드래그끝났을떄", newList);
    setAssignmentList(newList);
  };

  useEffect(() => {
    setAssignmentList(list);
  }, []);
  return (
    <aside>
      {/* <Sidebar header="전체 과제" contents={assignmentDummy} /> */}
      <Sidebar
        header={"전체 과제"}
        contents={assignmentList}
        isEdit={isEdit}
        lectureCheckHandler={handleListCheck}
        onDragEnd={whenDragEnd}
      />
      <button
        onClick={handleModal}
        className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold"
      >
        <span className="w-[22px] h-[22px] border border-[rgba(102,155,255,1)] rounded-full bg-[rgba(245,248,255,1)] flex items-center justify-center">
          <Image src={Vector} alt="과제 만들기" width={10} height={10} />
        </span>
        &nbsp;과제 만들기
      </button>
      {!isEdit ? (
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold"
        >
          <span className="w-[22px] h-[22px] border border-[rgba(102,155,255,1)] rounded-full bg-[rgba(245,248,255,1)] flex items-center justify-center">
            <Image src={Edit} alt="과제 수정" width={12} height={12} />
          </span>
          &nbsp;과제 수정
        </button>
      ) : (
        <div className="mt-[10px] flex justify-between">
          <button
            onClick={() => {
              setIsEdit(!isEdit);
              getUpdateList(assignmentList);
            }}
            className="bg-blue-500 text-white w-[115px] h-[35px] rounded-md px-4 hover:bg-blue-700 transition"
          >
            적용
          </button>
          <button
            onClick={deleteCheckList}
            className="bg-red text-white w-[115px] h-[35px] rounded-md px-4 hover:bg-rose-600 transition"
          >
            선택 삭제
          </button>
        </div>
      )}

      {modal && (
        <ModalWrapper modalTitle="과제 만들기" onCloseModal={handleModal}>
          <Modal onCloseModal={handleModal} />
        </ModalWrapper>
      )}
    </aside>
  );
};

export default AssignmentSidebar;
