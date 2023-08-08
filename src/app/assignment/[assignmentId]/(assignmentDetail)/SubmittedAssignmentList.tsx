"use client";

import React, { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import SubmittedAssignment from "../../(components)/(submittedAssignment)/SubmittedAssignment";
import Feedback from "../../(components)/(feedback)/Feedback";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import { SubmittedAssignment as s } from "@/types/firebase.types";
import { Read } from "./Detail";
import { DocumentData } from "firebase/firestore";
import useGetDetailSubmitted from "@/hooks/reactQuery/assignment/useGetDetailSubmitted";
import SubmitAssignmentCard from "./SubmitAssignmentCard";
import AssignmentFileSubmitModal from "../../(components)/AssignmentFileSubmitModal";
import AssignmentLinkSubmitModal from "../../(components)/AssignmentLinkSubmitModal";

const SubmittedAssignmentList = ({
  setRead,
}: {
  setRead: React.Dispatch<React.SetStateAction<Read>>;
}) => {
  const { assignmentId } = useParams();
  const userData = useAppSelector(state => state.userInfo);
  const { data: result, isLoading } = useGetDetailSubmitted(
    assignmentId as string,
  );

  const [usersId, setUsersId] = useState<string>("");
  const [documentId, setDocumentId] = useState<string>("");

  const [fileModal, setFileModal] = useState<boolean>(false);
  const [linkModal, setLinkModal] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);

  const handleLinkModalState = () => {
    setIsFileModalOpen(false);
    setIsLinkModalOpen(prev => !prev);
  };

  const handleFileModalState = () => {
    setIsLinkModalOpen(false);
    setIsFileModalOpen(prev => !prev);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleFileModal = () => {
    setFileModal(!fileModal);
  };

  const handleLinkModal = () => {
    setLinkModal(!linkModal);
  };

  if (isLoading) return <div></div>;
  return (
    <div>
      {(userData as DocumentData).role === "관리자" ? (
        result?.length ? (
          result.map((ele, index: number) => {
            return (
              <SubmitAssignmentCard
                setRead={setRead}
                ele={ele as s}
                setUsersId={setUsersId}
                setModal={setModal}
                setDocumentId={setDocumentId}
                key={index}
              />
            );
          })
        ) : (
          <div>
            <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
            <h2 className="font-[500] text-[20px] text-grayscale-30">
              제출된 과제가 없습니다
            </h2>
          </div>
        )
      ) : undefined}

      {modal && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
          <SubmittedAssignment documentId={documentId as string} />
          <Feedback
            docId={documentId as string}
            userId={userData.id}
            userData={userData}
          />
        </ModalWrapper>
      )}

      {(userData as DocumentData).role !== "관리자" ? (
        <div className="w-[775px] border rounded-[10px] p-[24px] mb-[16px] flex justify-between">
          <div className="flex">
            <div className="w-[43px] h-[43px] rounded-full mr-[14px]">
              <img
                src={"/images/avatar.svg"}
                alt="profileImage"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-y-[9px]">
              <div className="flex items-center gap-x-[6px]">
                <span className="text-[16px] font-[700] leading-[19.2px] text-grayscale-100">
                  {userData.username}
                </span>
                <div className="w-[5px] h-[5px] rounded-full bg-grayscale-30"></div>
                <span className="text-[16px] font-[400] leading-[19.2px] text-grayscale-40">
                  {userData.role}
                </span>
              </div>
              <div className="max-w-max rounded-[4px] leading-[12px] text-grayscale-40 bg-grayscale-5 py-[4px] px-[10px] text-[10px]">
                제출 전
              </div>
            </div>
          </div>
          <div className="flex gap-x-[8px] items-center">
            <button
              className="w-[115px] h-[35px] bg-grayscale-5 rounded-[7px] py-[9px] text-[14px] leading-[16.71px] font-[500] text-[#666]"
              onClick={() => {
                setFileModal(!fileModal);
              }}
            >
              파일 첨부
            </button>
            <button
              className="w-[115px] h-[35px] bg-grayscale-5 rounded-[7px] py-[9px] text-[14px] leading-[16.71px] font-[500] text-[#666]"
              onClick={() => {
                setLinkModal(!linkModal);
              }}
            >
              링크
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {fileModal && (
        <ModalWrapper onCloseModal={handleFileModal}>
          <AssignmentFileSubmitModal
            handleModalState={handleFileModalState}
            userId={userData.id}
            assignmentId={assignmentId as string}
          />
        </ModalWrapper>
      )}

      {linkModal && (
        <ModalWrapper onCloseModal={handleLinkModal}>
          <AssignmentLinkSubmitModal
            handleModalState={handleLinkModalState}
            userId={userData.id}
            assignmentId={assignmentId as string}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default SubmittedAssignmentList;