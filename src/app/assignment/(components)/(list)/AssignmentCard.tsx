import Link from "next/link";
import React from "react";

interface AssignmentCardProps {
  data: any;
}
const AssignmentCard = ({ data }: AssignmentCardProps) => {
  return (
    <div className="flex justify-between w-full h-[49px]">
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-center w-[29px] h-5 bg-[rgba(243,243,243,1)] rounded text-[10px] leading-3 tracking-[-0.02em] ">
          {data.level}
        </div>
        <h3 className="min-h-[19px] text-left text-[16px] font-[700] leading-[19px] tracking-tighter">
          {/* <h3 className="h-[19px] text-left text-[16px] font-[700] leading-[19px] tracking-tighter"> */}
          {data.title}
          {/* {data.order}. {data.title} */}
        </h3>
      </div>
      <div className="my-auto">
        <Link href={`/assignment/${data.id}`}>
          <button className="bg-blue-500 text-white w-[115px] h-[35px] rounded-md px-4 hover:bg-blue-700 transition">
            확인하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
