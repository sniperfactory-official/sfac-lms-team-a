"use client";

import ModalWrapper from "@/components/ModalWrapper";
import useGetDetailAssignment, {
  useGetUser,
} from "@/hooks/reactQuery/assignment/useGetDetailAssignment";
import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { useAppSelector } from "@/redux/store";
import { db } from "@/utils/firebase";
import timestampToDate from "@/utils/timestampToDate";
import { DocumentReference, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import Modal from "../../(components)/(assignmentCreateModal)/Modal";
import { Read } from "./Detail";
import {
  useGetUsersByStudent,
  usePushReadStudent,
} from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import { Assignment } from "@/types/firebase.types";

const Main = ({ read }: { read: Read }) => {
  const { assignmentId } = useParams();

  const userId = useAppSelector(state => state.userInfo.id);
  const { data: userData } = fetchUserInfo(userId);

  const [assignModal, setAssignModal] = useState(false);
  const handleAssignModal = () => {
    setAssignModal(!assignModal);
  };

  // pushReadStudent(userId,assignmentId)
  const { data: dsf } = usePushReadStudent(userId, assignmentId as string);

  //users 컬렉션의 모든 document를 가져와서 role === 'student' 인 수만 가져옴 === total === userD?.length
  //readStudent[].length를 가져와서 readStudent[].length/total readStudent[].length === assignData.readStudents.length
  //users.role === 'student' 일 경우에는 detail 페이지에 접속하면 readStudent[]에 추가
  //하지만 이때 중복을 조심!!!
  const { data: userD } = useGetUsersByStudent(userId);
  // console.log(userD?.length) total
  //말 그래도 detail 페이지에서 과제 정보를 보내주는 훅 (걍 과제 제목.내용,강의시작날짜,마감날짜 등등...)
  //assignment 콜렉션에서 가져온 딱 하나의 과제
  const {
    data: assignData,
    isLoading,
    error,
  } = useGetDetailAssignment(assignmentId as string);

  const {
    data: makeAssignmentUser,
    isLoading: isL,
    error: er,
  } = useGetUser(assignData?.userId.id as string);

  //textarea 엔터키 구하는 코드
  const textes = assignData?.content?.split("\n");
  const changeText = (textes: string[]) => {
    return textes?.map((text: string, index: number) => (
      <p key={index}>{text}</p>
    ));
  };
  if (isLoading) return <div>로딩중...</div>;
  return (
    <>
      <div className="w-[736px] flex justify-between items-center mb-[33px]">
        <div className="flex items-center gap-x-[9px]">
          <div className="w-[46px] h-[46px] rounded-full">
            <img
              src={
                makeAssignmentUser?.profileImage
                  ? makeAssignmentUser?.profileImage
                  : "/images/avatar.svg"
              }
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <div className="flex items-center gap-x-[12px]">
              <span className="text-[16px] font-[700] leading-[19.2px]">
                {makeAssignmentUser?.username}
              </span>
              {userData?.role === "관리자" ? (
                <div className="border rounded-[4px] py-[4px] px-[6.5px] h-[20px] text-[10px] flex justify-center items-center border-[#196AFF] text-primary-100 leading-[11.93px] font-[500]">
                  {userD
                    ? Math.floor(
                        ((assignData as Assignment).readStudents.length /
                          userD?.length) *
                          100,
                      )
                    : "0"}
                  % 읽음
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center gap-x-[7px]">
              <span className="text-grayscale-60 leading-[19.2px] text-[16px] font-[400] ">
                {makeAssignmentUser?.role}
              </span>
              <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
              <span className="text-grayscale-40 text-[14px]">
                {assignData ? timestampToDate(assignData.startDate) : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-[5px]">
          <span
            className="text-grayscale-100 text-[12px] font-[400] leading-[14.4px] cursor-pointer"
            onClick={() => setAssignModal(!assignModal)}
          >
            수정
          </span>
          <div className="w-[1px] h-[14px] bg-grayscale-30"></div>
          <span
            className="text-grayscale-100 text-[12px] font-[400] leading-[14.4px] cursor-pointer"
            onClick={async () => {
              await deleteDoc(doc(db, "assignments", assignmentId as string));
              router.push("/assignment");
            }}
          >
            삭제
          </span>
        </div>
      </div>

      {assignData && (
        <div className="w-[736px]">
          <div className="mb-[16px]">
            <div className="mb-[10px] w-[469px] text-[18px] font-[700]">
              {assignData.title}
            </div>
            <div className="w-[700px] text-[14px] text-grayscale-60 font-[400]">
              {changeText(textes as string[])}
            </div>
          </div>
          <div className="ml-auto max-w-max mb-[18px] text-[14px] leading-[16.71px] flex items-center gap-x-[7px]">
            <span className="text-grayscale-60">마감일</span>
            <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
            <span className="text-grayscale-40">
              {assignData ? timestampToDate(assignData.endDate) : ""}
            </span>
          </div>
          <div className="w-[736px] h-[1px] bg-grayscale-5 mb-[16px]"></div>
        </div>
      )}

      {assignModal && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleAssignModal}>
          <Modal userId={userId}></Modal>
        </ModalWrapper>
      )}
    </>
  );
};

export default Main;
