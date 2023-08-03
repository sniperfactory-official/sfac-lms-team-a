"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import ModalWrapper from "@/components/ModalWrapper";
import useGetDetailAssignment, {
  getDetailAssignment,
} from "@/hooks/reactQuery/assignment/useGetDetailAssignment";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "../(components)/(assignmentCreateModal)/Modal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useGetAssignments } from "@/hooks/reactQuery/useGetAssignments";
import AssignmentSidebar from "@/app/assignment/(components)/(list)/AssignmentSidebar";
import AssignmentEmptyBox from "../(components)/AssignmentEmptyBox";
import { Assignment } from "@/types/firebase.types";
import useGetSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import useGetDetailSubmitted from "@/hooks/reactQuery/assignment/useGetDetailSubmitted";
import SubmittedAssignment from "../(components)/(submittedAssignment)/SubmittedAssignment";
import Feedback from "../(components)/(feedback)/Feedback";
import SubmitAssign from "./(components)/SubmitAssign";

const AssignmentDetailPage = () => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  const router = useRouter();
  const { assignmentId } = useParams();
  //이게 유저 아이디? 혹은 과제 아이디?
  // const result = getDetailAssignment(assignmentId as string)
  // console.log(result)
  const { data, isLoading, error } = useGetDetailAssignment(
    assignmentId as string,
  );

  const {
    data: listData,
    error: listError,
    isLoading: listIsLoading,
  } = useGetAssignments();
  const getUpdateList = (arr: any[]) => {
    console.log(arr);
  };

  const [feedId, setFeedId] = useState<string>();
  const [documentId, setDocumentId] = useState<string>();
  const [userda, setUserda] = useState();

  const result = useGetDetailSubmitted(assignmentId as string);
  console.log(result);

  const attachData = useGetSubmittedAssignment(documentId as string);
  console.log(attachData);

  //textarea 엔터키 구하는 코드
  const textes = data?.content?.split("\n");
  const changeText = (textes: string[]) => {
    return textes?.map((text: string, index: number) => (
      <p key={index}>{text}</p>
    ));
  };

  //시작일, 마감일 구하는 코드
  const startTimestamp = data?.startDate.seconds;
  const startDate = new Date((startTimestamp as number) * 1000);
  const startMonth =
    startDate.getMonth().toString().length === 1
      ? "0" + (startDate.getMonth() + 1).toString()
      : (startDate.getMonth() + 1).toString();
  const startDay =
    startDate.getDate().toString().length === 1
      ? "0" + startDate.getDate().toString()
      : startDate.getDate().toString();

  const endTimestamp = data?.endDate.seconds;
  const endDate = new Date((endTimestamp as number) * 1000);
  const endMonth =
    endDate.getMonth().toString().length === 1
      ? "0" + (endDate.getMonth() + 1).toString()
      : (endDate.getMonth() + 1).toString();
  const endDay =
    endDate.getDate().toString().length === 1
      ? "0" + endDate.getDate().toString()
      : endDate.getDate().toString();

  if (listIsLoading || isLoading) return <div>Loading...</div>;
  return (
    <div className="flex mx-auto justify-center gap-x-[20px]">
      {listData && (
        <AssignmentSidebar list={listData} getUpdateList={getUpdateList} />
      )}
      <div>
        <div className="w-[736px] flex justify-between items-center mb-[33px]">
          <div className="flex items-center gap-x-[9px]">
            <div className="w-[46px] h-[46px] rounded-full">
              <img
                src="/images/facebookLogo.svg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-[7px]">
              <span className="text-[16px] font-[700] leading-[19.2px]">
                스나이퍼팩토리
              </span>
              <div className="flex items-center gap-x-[7px]">
                <span className="text-grayscale-60 leading-[19.2px] text-[16px] font-[400] ">
                  멘토
                </span>
                <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
                <span className="text-grayscale-40 text-[14px]">
                  {startDate.getFullYear().toString() +
                    "/" +
                    startMonth +
                    "/" +
                    startDay}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <span
              className="text-grayscale-100 text-[12px] font-[400] leading-[14.4px] cursor-pointer"
              onClick={() => setModal(!modal)}
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

        {data && (
          <div className="w-[736px]">
            <div className="mb-[16px]">
              <div className="mb-[10px] w-[469px] text-[18px] font-[700]">
                {data.title}
              </div>
              <div className="w-[700px] text-[14px] text-grayscale-60 font-[400]">
                {changeText(textes as string[])}
              </div>
            </div>
            <div className="ml-auto max-w-max mb-[18px] text-[14px] leading-[16.71px] flex items-center gap-x-[7px]">
              <span className="text-grayscale-60">마감일</span>
              <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
              <span className="text-grayscale-40">
                {endDate.getFullYear().toString() +
                  "/" +
                  endMonth +
                  "/" +
                  endDay}
              </span>
            </div>
            <div className="w-[736px] h-[1px] bg-grayscale-5"></div>
          </div>
        )}


        {/* {result.data !== undefined ? (
          result.data?.map((ele, index) => {
            const id = ele?.userId.id;
            let k;
            if (ele) {
              k = ele.id as string;
            }
            return (
              <SubmitAssign
                k={k}
                setUserda={setUserda}
                setModal={setModal}
                setDocumentId={setDocumentId}
                setFeedId={setFeedId}
                id={id}
                key={index}
              />
            );
          })
        ) : (
          <AssignmentEmptyBox EmptyText={"제출된 과제가 없습니다"} />
        )} */}

        {result.data !== undefined ? (
          result.data?.map((ele, index) => {
            let k;
            if (ele) {
              const id = ele.userId.id;
              const time = ele.createAt?.seconds
              console.log(time)
              k = ele.id as string;
              return (
                <SubmitAssign
                  k={k}
                  setUserda={setUserda}
                  setModal={setModal}
                  setDocumentId={setDocumentId}
                  setFeedId={setFeedId}
                  id={id}
                  key={index}
                ></SubmitAssign>
              );
            }
          })
        ) : (
          <div>
            <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
            <h2 className="font-[500] text-[20px] text-grayscale-30">
              제출된 과제가 없습니다
            </h2>
          </div>
        )}

        {/* <div>
          <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
          <h2 className="font-[500] text-[20px] text-grayscale-30">
            제출된 과제가 없습니다
          </h2>
        </div> */}
        {/* attachment 부분 */}


        {modal && (
          <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
            <SubmittedAssignment k={documentId}></SubmittedAssignment>
            <Feedback
              docId={documentId}
              userId={feedId}
              userData={userda}
            ></Feedback>
          </ModalWrapper>
        )}

        {/* {modal && (
          <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
            <div>
              {attachData.data &&
                attachData.data.map(data => {
                  return (
                    <div>
                      <span>{data.user?.username}</span>-
                      <span>{data.user?.role}</span>
                    </div>
                  );
                })}
            </div>
            <Feedback docId2={documentId} userId={feedId} userData={userda} />
          </ModalWrapper>
        )} */}
        {/* {modal && (
          <ModalWrapper modalTitle="과제 만들기" onCloseModal={handleModal}>
            <Modal onCloseModal={handleModal} />
          </ModalWrapper>
        )} */}
      </div>
    </div>
  );
};

export default AssignmentDetailPage;
