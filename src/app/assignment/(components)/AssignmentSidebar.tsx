"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { Assignment } from "@/types/firebase.types";
import Vector from "/public/images/Vector.svg";
import Edit from "/public/images/Edit.svg";
import { useUpdateAssignmentsOrder } from "@/hooks/reactQuery/assignment/useUpdateAssignmentOrder";
import { useDeleteAssignments } from "@/hooks/reactQuery/assignment/useDeleteAssignments";
import useHandleListCheck from "@/hooks/common/useHandleListCheck";

interface AssignmentSidebarProps {
  list: Assignment[];
}

const AssignmentSidebar = ({ list }: AssignmentSidebarProps) => {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>(list);
  const [isEdit, setIsEdit] = useState(false);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const { mutateAsync: updateMutate, isLoading: updateIsLoading } =
    useUpdateAssignmentsOrder();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteAssignments();
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
  // useEffect(() => {
  //   if (!isOrderChanged) {
  //     setAssignmentList(list);
  //   }
  // }, [list]);
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
        />
      </div>
      <button className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold">
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
            onClick={updateAssignment}
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
    </aside>
  );
};

export default AssignmentSidebar;

// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";
// import { Assignment } from "@/types/firebase.types";
// import Vector from "/public/images/Vector.svg";
// import Edit from "/public/images/Edit.svg";
// import { useDeleteAssignments } from "@/hooks/reactQuery/assignment/useDeleteAssignments";
// import { useUpdateAssignmentsOrder } from "@/hooks/reactQuery/assignment/useUpdateAssignmentOrder";
// import useHandleListCheck from "@/hooks/common/useHandleListCheck";

// interface AssignmentSidebarProps {
//   list: Assignment[];
// }

// const AssignmentSidebar = ({ list }: AssignmentSidebarProps) => {
//   const { mutate: deleteMutate } = useDeleteAssignments();
//   // const { mutate: updateMutate } = useUpdateAssignmentsOrder();
//   const { mutateAsync: updateMutate } = useUpdateAssignmentsOrder();
//   const [isEdit, setIsEdit] = useState(false);
//   const [isOrderChanged, setIsOrderChanged] = useState(false);
//   const { checkedList, handleListCheck } = useHandleListCheck([]);

//   const deleteCheckList = async () => {
//     if (checkedList.length === 0) return;
//     const beforeCheck = confirm("선택된 과제를 삭제하시겠습니까??");
//     if (beforeCheck) {
//       if (checkedList) {
//         await deleteMutate(checkedList);
//         // const newAssignmentList = list.filter(
//         //   (assignment: Assignment) => !checkedList.includes(assignment.id),
//         // );
//         // console.log(newAssignmentList);
//         // setAssignmentList(newAssignmentList);
//       }
//     }
//   };

//   const updateAssignment = async () => {
//     if (isOrderChanged) {
//       await updateMutate(list);
//       setIsOrderChanged(!isOrderChanged);
//     }
//     setIsEdit(!isEdit);
//   };
//   const getDraggedList = (newList: Assignment[]) => {
//     console.log("@드래그끝났을떄", newList);
//     // setAssignmentList(newList);
//     setIsOrderChanged(true);
//   };
//   return (
//     <aside>
//       <Sidebar
//         header={"전체 과제"}
//         contents={list}
//         isEdit={isEdit}
//         lectureCheckHandler={handleListCheck}
//         onDragEnd={getDraggedList}
//       />
//       <button
//         // onClick={handleModal}
//         className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold"
//       >
//         <span className="w-[22px] h-[22px] border border-[rgba(102,155,255,1)] rounded-full bg-[rgba(245,248,255,1)] flex items-center justify-center">
//           <Image src={Vector} alt="과제 만들기" width={10} height={10} />
//         </span>
//         &nbsp;과제 만들기
//       </button>
//       {!isEdit ? (
//         <button
//           onClick={() => setIsEdit(!isEdit)}
//           className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold"
//         >
//           <span className="w-[22px] h-[22px] border border-[rgba(102,155,255,1)] rounded-full bg-[rgba(245,248,255,1)] flex items-center justify-center">
//             <Image src={Edit} alt="과제 수정" width={12} height={12} />
//           </span>
//           &nbsp;과제 수정
//         </button>
//       ) : (
//         <div className="mt-[10px] flex justify-between">
//           <button
//             onClick={updateAssignment}
//             className="bg-blue-500 text-white w-[115px] h-[35px] rounded-md px-4 hover:bg-blue-700 transition"
//           >
//             적용
//           </button>
//           <button
//             onClick={deleteCheckList}
//             className="bg-red text-white w-[115px] h-[35px] rounded-md px-4 hover:bg-rose-600 transition"
//           >
//             선택 삭제
//           </button>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default AssignmentSidebar;
