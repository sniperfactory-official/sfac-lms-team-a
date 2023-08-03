import { useGetUser } from "@/hooks/reactQuery/assignment/useGetDetailAssignment";
import useGetSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import React from "react";

type Props = {
  id: string;
  setFeedId: () => void;
  k: string;
  setDocumentId: () => void;
  setModal: () => void;
  setUserda: () => void;
  time: number
};

const SubmitAssign = ({
  id,
  setFeedId,
  k,
  setDocumentId,
  setModal,
  setUserda,
}) => {
  const { data, isLoading, error } = useGetUser(id);
  const attachData = useGetSubmittedAssignment(k);
  let w: Date = new Date();
  if (attachData.data) {
    w = new Date(attachData.data[0].createdAt.seconds * 1000)
  }

  const [createYear, createMonth, createDay] = [
    w.getFullYear().toString(),
    w.getMonth().toString().length === 1 && w.getMonth().toString() !== "9"
      ? "0" + (w.getMonth() + 1).toString()
      : (w.getMonth() + 1).toString(),
    w.getDate().toString().length === 1
      ? "0" + w.getDate().toString()
      : w.getDate().toString(),
  ];

  // console.log(w)
  if (isLoading) return <div></div>
  return (
    <div
      className="w-[775px] border cursor-pointer rounded-[10px] pt-[25px] pb-[22px] px-[25px] mb-[16px] flex justify-between"
      onClick={() => {
        setFeedId(id);
        setDocumentId(k);
        setModal(prev => !prev);
        setUserda(data);
      }}
    >
      <div className="flex">
        <div className="w-[43px] h-[43px] rounded-full mr-[14px]">
          <img src={attachData.data ? (attachData.data[0].user?.profileImage ? attachData.data[0].user?.profileImage : '/images/avatar.svg') : '/images/avatar.svg'} alt="profileImage" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-y-[9px]">
          <div className="flex items-center gap-x-[6px]">
            <span className="text-[16px] font-[700] leading-[19.2px] text-grayscale-100">{data?.username}</span>
            <div className="w-[5px] h-[5px] rounded-full bg-grayscale-30"></div>
            <span className="text-[16px] font-[400] leading-[19.2px] text-grayscale-40">{data?.role}</span>
          </div>
          <p className="text-[14px] leading-[16.8px] text-grayscale-40">{attachData.data ? attachData.data[0].links : ""}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="w-[18px] h-[18px] rounded-full bg-red text-[14px] font-[700] leading-[16.8px] text-grayscale-10 flex justify-center items-center ml-auto">
          N
        </div>
        <span className="text-[14px] text-grayscale-40">{createYear}/{createMonth}/{createDay}</span>
      </div>

    </div>
  );
};

export default SubmitAssign;
