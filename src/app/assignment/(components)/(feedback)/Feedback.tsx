"use client";
import useGetFeedbacks from "@/hooks/reactQuery/useGetFeedbacks";
import React from "react";
import FeedbackCard from "./FeedbackCard";
import Card from "../Card";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
  // docId === submittedAssignmentId
  // 즉 Dynamic Route는 따로 되지 않으므로 나중에 submittedAssignment 클릭시 이벤트로 id 가져오기
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading } = useGetFeedbacks(docId);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section className="flex flex-col p-5 gap-5 relative">
        {data?.map(feedback => {
          return (
            <Card key={feedback.id} vertical={true}>
              <FeedbackCard feedback={feedback} docId={docId} />
            </Card>
          );
        })}
        <FeedbackForm docId={docId} />
      </section>
    </>
  );
};

export default Feedback;
