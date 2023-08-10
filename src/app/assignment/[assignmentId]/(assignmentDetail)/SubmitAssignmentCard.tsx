import { SubmittedAssignment, User } from "@/types/firebase.types";
import timestampToDate from "@/utils/timestampToDate";
import React, { useEffect, useState } from "react";
import { Read } from "./Detail";
import { useGetUser } from "@/hooks/reactQuery/assignment/useGetDetailAssignment";
import { useGetSubmittedAssignment } from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import ModalWrapper from "@/components/ModalWrapper";
import SubmittedAssignmentDetail from "../../(components)/SubmittedAssignmentDetail";
import useModal from "@/hooks/common/useModal";

interface SubmitAssignProps {
  ele: SubmittedAssignment;
  setRead: React.Dispatch<React.SetStateAction<Read>>;
  userData: User;
}

const SubmitAssignmentCard = ({
  userData,
  ele,
  setRead,
}: SubmitAssignProps) => {
  const { data, isLoading, error } = useGetUser(ele.userId.id);
  const attachData = useGetSubmittedAssignment(ele.id);

  useEffect(() => {
    ele.isRead
      ? setRead(prev => {
          return { read: prev.read + 1, total: prev.total + 1 };
        })
      : setRead(prev => {
          return { read: prev.read, total: prev.total + 1 };
        });
  }, []);

  const { isModalOpen, handleModal } = useModal();

  if (error) return <div></div>;
  if (isLoading) return <div></div>;
  return (
    <>
      {isModalOpen && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
          <SubmittedAssignmentDetail docId={ele.id} userData={userData} />
        </ModalWrapper>
      )}
      <div
        className="w-[775px] border cursor-pointer rounded-[10px] pt-[25px] pb-[22px] px-[25px] mb-[16px] flex justify-between"
        onClick={handleModal}
      >
        <div className="flex">
          <div className="w-[43px] h-[43px] rounded-full mr-[14px] border bg-grayscale-10">
            <img
              src={
                attachData.data
                  ? attachData.data[0]?.user?.profileImage
                    ? attachData.data[0]?.user?.profileImage
                    : "/images/avatar.svg"
                  : "/images/avatar.svg"
              }
              alt="profileImage"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-[9px]">
            <div className="flex items-center gap-x-[6px]">
              <span className="text-[16px] font-[700] leading-[19.2px] text-grayscale-100">
                {data?.username}
              </span>
              <div className="w-[5px] h-[5px] rounded-full bg-grayscale-30"></div>
              <span className="text-[16px] font-[400] leading-[19.2px] text-grayscale-40">
                {data?.role}
              </span>
            </div>
            <p className="text-[14px] leading-[16.8px] text-grayscale-40 line-clamp-1 w-[537px]">
              {attachData.data
                ? attachData.data[0]?.links &&
                  attachData.data[0].links[0].length
                  ? attachData.data[0]?.links[0]
                  : attachData.data[0]?.attachmentFiles
                  ? attachData.data[0]?.attachmentFiles[0].name
                  : ""
                : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {ele.isRead ? (
            <div></div>
          ) : (
            <div className="w-[18px] h-[18px] rounded-full bg-red text-[14px] font-[700] leading-[16.8px] text-grayscale-10 flex justify-center items-center ml-auto">
              N
            </div>
          )}
          <span className="text-[14px] text-grayscale-40">
            {ele.createdAt ? timestampToDate(ele.createdAt) : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default SubmitAssignmentCard;
