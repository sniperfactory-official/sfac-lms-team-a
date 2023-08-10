import React from "react";
import Link from "next/link";
import { Assignment, User } from "@/types/firebase.types";

interface AssignmentCardProps {
  data: Assignment;
  role: string;
  submittedList: string[];
}

const AssignmentCard = ({ data, role, submittedList }: AssignmentCardProps) => {
  const isSubmitted = submittedList.includes(data.id);

  const buttonText =
    role === "관리자" ? "확인하기" : isSubmitted ? "제출완료" : "제출하기";

  const buttonStyle = `w-[115px] h-[35px] rounded-md px-4 transition ${
    role === "관리자" || !isSubmitted
      ? "bg-[rgba(51,122,255,1)] hover:bg-blue-700 text-white"
      : "bg-[rgba(243,243,243,1)] hover:bg-gray-400 text-[rgba(102,102,102,1)]"
  }`;

  return (
    <div className="flex justify-between w-full h-[49px]">
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-center w-[29px] h-5 bg-[rgba(243,243,243,1)] rounded text-[10px] leading-3 tracking-[-0.02em] ">
          {data.level}
        </div>
        <h3 className="min-h-[19px] text-left text-[16px] font-[700] leading-[19px] tracking-tighter">
          {data.title}
        </h3>
      </div>
      <div className="my-auto">
        <Link href={`/assignment/${data.id}`}>
          <button className={buttonStyle}>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
