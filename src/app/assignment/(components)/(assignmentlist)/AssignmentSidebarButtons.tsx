import React from "react";
import Image from "next/image";
import Edit from "/public/images/Edit.svg";
import blueAdd from "/public/images/blueAdd.svg";

interface AssignmentSidebarButtonsProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  updateAssignment: () => void;
  deleteCheckList: () => void;
  handleModal: () => void;
}

const AssignmentSidebarButtons = ({
  isEdit,
  setIsEdit,
  updateAssignment,
  deleteCheckList,
  handleModal,
}: AssignmentSidebarButtonsProps) => {
  return (
    <>
      <button
        onClick={handleModal}
        className="w-60 h-12 mt-[10px] flex items-center justify-center rounded-lg border border-[rgba(102,155,255,1)] text-[rgba(102,155,255,1)] font-semibold"
      >
        <span className="w-[22px] h-[22px] border border-[rgba(102,155,255,1)] rounded-full bg-[rgba(245,248,255,1)] flex items-center justify-center">
          <Image src={blueAdd} alt="과제 만들기" width={10} height={10} />
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
    </>
  );
};

export default AssignmentSidebarButtons;
