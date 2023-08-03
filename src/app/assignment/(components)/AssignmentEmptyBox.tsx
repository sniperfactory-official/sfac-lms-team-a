import React from "react";

interface AssignmentEmptyBoxProps {
  EmptyText: string;
}
const AssignmentEmptyBox = ({ EmptyText }: AssignmentEmptyBoxProps) => {
  return (
    <div className="w-[775px] h-[300px] flex flex-col items-center justify-center">
      <div className="mx-auto flex flex-col items-center justify-center w-[573px] h-[199px]">
        {/* <div className="mx-auto flex flex-col items-center justify-center w-[573px] h-[199px]"> */}
        <img src="/images/sad.svg" alt="" className="" />
        <h2 className="font-[500] text-[24px] text-grayscale-30">
          {EmptyText}
        </h2>
      </div>
    </div>
  );
};

export default AssignmentEmptyBox;
