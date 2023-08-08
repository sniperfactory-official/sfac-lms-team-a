"use client";
import React from "react";
import Feedback from "./(feedback)/Feedback";
import { User } from "@/types/firebase.types";
import { useGetSubmittedAssignment } from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import SubmittedAssignmentContent from "./(submittedAssignment)/SubmittedAssignmentContent";
import useGetFeedbacks from "@/hooks/reactQuery/feedback/useGetFeedbacks";
import LoadingSpinner from "@/components/Loading/Loading";

const SubmittedAssignmentDetail = ({
  docId,
  userData,
}: {
  docId: string;
  userData: User;
}) => {
  const {
    data: submittedAssignmentData,
    isLoading: submittedAssignmentIsLoading,
    error: submittedAssignmentError,
  } = useGetSubmittedAssignment(docId);
  const { data: feedbackData, isLoading: feedbackIsLoading } =
    useGetFeedbacks(docId);

  // console.log("submitted", data);
  // isLoading 대신에 prefetch를 사용할 경우
  // const { handleMouseOver } = useGetFeedbacks("gZWELALnKoZLzJKjXGUM");
  if (submittedAssignmentIsLoading || feedbackIsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mt-[22.92px]">
      <SubmittedAssignmentContent data={submittedAssignmentData} />
      <Feedback data={feedbackData} docId={docId} userData={userData} />
    </section>
  );
};

export default SubmittedAssignmentDetail;
