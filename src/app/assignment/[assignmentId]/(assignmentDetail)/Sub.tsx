"use client";

import useGetDetailSubmitted from "@/hooks/reactQuery/assignment/useGetDetailSubmitted";
import React, { useEffect, useState } from "react";
import SubmitAssign from "./SubmitAssign";
import ModalWrapper from "@/components/ModalWrapper";
import SubmittedAssignment from "../../(components)/(submittedAssignment)/SubmittedAssignment";
import Feedback from "../../(components)/(feedback)/Feedback";
import { useAppSelector } from "@/redux/store";
import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { useParams } from "next/navigation";
import { SubmittedAssignment as s } from "@/types/firebase.types";
import { Read } from "./Detail";
import AssignmentFileSubmitModal from "../../(components)/AssignmentFileSubmitModal";
import AssignmentLinkSubmitModal from "../../(components)/AssignmentLinkSubmitModal";
import { DocumentData } from "firebase/firestore";

const Sub = ({
  setRead,
}: {
  setRead: React.Dispatch<React.SetStateAction<Read>>;
}) => {
  const { assignmentId } = useParams();
  const userId = useAppSelector(state => state.userId.uid);
  const { data: userData } = fetchUserInfo(userId);
  const { data: result, isLoading } = useGetDetailSubmitted(
    assignmentId as string,
  );

  const [usersId, setUsersId] = useState<string>("");
  const [documentId, setDocumentId] = useState<string>("");

  const [fileModal, setFileModal] = useState<boolean>(false);
  const [linkModal, setLinkModal] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  const handleFileModal = () => {
    setFileModal(!fileModal)
  }

  const handleLinkModal = () => {
    setLinkModal(!linkModal)
  }

  if (isLoading) return <div></div>;
  return (
    <div>
      {(userData as DocumentData).role === "관리자" ? (result?.length ? (
        result.map((ele, index: number) => {
          return (
            <SubmitAssign
              setRead={setRead}
              ele={ele as s}
              setUsersId={setUsersId}
              setModal={setModal}
              setDocumentId={setDocumentId}
              key={index}
            ></SubmitAssign>
          );
        })
      ) : (
        <div>
          <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
          <h2 className="font-[500] text-[20px] text-grayscale-30">
            제출된 과제가 없습니다
          </h2>
        </div>
      )) : undefined}

      {modal && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
          <SubmittedAssignment
            documentId={documentId as string}
          ></SubmittedAssignment>
          <Feedback
            docId={documentId as string}
            userId={userId}
            userData={userData}
          ></Feedback>
        </ModalWrapper>
      )}

      {(userData as DocumentData).role == "관리자" ? (<div className="w-[775px] border rounded-[10px] p-[24px] mb-[16px] flex justify-between">
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
                {(userData as DocumentData).username}
              </span>
              <div className="w-[5px] h-[5px] rounded-full bg-grayscale-30"></div>
              <span className="text-[16px] font-[400] leading-[19.2px] text-grayscale-40">
                {(userData as DocumentData).role}
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
      </div>) : ""}
      

      {fileModal && 
      <ModalWrapper onCloseModal={handleFileModal}>
        <AssignmentFileSubmitModal></AssignmentFileSubmitModal>
      </ModalWrapper>}

      {linkModal && 
      <ModalWrapper onCloseModal={handleLinkModal}>
        <AssignmentLinkSubmitModal></AssignmentLinkSubmitModal>
      </ModalWrapper>
      }

    </div>
  );
};

export default Sub;

{
  /* <div>
      {result?.length ? (
        result.map((ele, index: number) => {
          return (
            <SubmitAssign
              setRead={setRead}
              ele={ele as s}
              setUsersId={setUsersId}
              setModal={setModal}
              setDocumentId={setDocumentId}
              key={index}
            ></SubmitAssign>
          );
        })
      ) : (
        <div>
          <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
          <h2 className="font-[500] text-[20px] text-grayscale-30">
            제출된 과제가 없습니다
          </h2>
        </div>
      )}

      {modal && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
          <SubmittedAssignment
            documentId={documentId as string}
            userId={usersId}
          ></SubmittedAssignment>
          <Feedback
            docId={documentId as string}
            userId={userId}
            userData={userData}
          ></Feedback>
        </ModalWrapper>
      )} */
}
