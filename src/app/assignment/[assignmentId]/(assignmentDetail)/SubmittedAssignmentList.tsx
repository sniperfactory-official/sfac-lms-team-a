"use client";

import React, { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import { SubmittedAssignment as s } from "@/types/firebase.types";
import { Read } from "./Detail";
import { DocumentData } from "firebase/firestore";
import useGetDetailSubmitted from "@/hooks/reactQuery/assignment/useGetDetailSubmitted";
import SubmitAssignmentCard from "./SubmitAssignmentCard";
import SubmittedAssignmentDetail from "../../(components)/SubmittedAssignmentDetail";
import StudentAssignmentSubmitCard from "../../(components)/StudentAssignmentSubmitCard";

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
  const [documentId, setDocumentId] = useState<string>("");

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
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
                // setUsersId={setUsersId}
                setModal={setModal}
                setDocumentId={setDocumentId}
                key={index}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="w-[74.82px] h-[89.91px] mb-[18.88px] mt-[65px]">
              <img src="/images/sad.svg" alt="" className="" />
            </div>
            <h2 className="font-[500] text-[20px] text-grayscale-30">
              제출된 과제가 없습니다
            </h2>
          </div>
        )
      ) : (
        <StudentAssignmentSubmitCard
          userId={userData.id}
          username={userData.username}
          role={userData.role}
          profileImage={userData.profileImage}
          assignmentId={
            Array.isArray(assignmentId) ? assignmentId[0] : assignmentId
          }
        />
      )}

      {modal && (
        <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
          <SubmittedAssignmentDetail
            docId={Array.isArray(assignmentId) ? assignmentId[0] : assignmentId}
            userData={userData}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default SubmittedAssignmentList;
