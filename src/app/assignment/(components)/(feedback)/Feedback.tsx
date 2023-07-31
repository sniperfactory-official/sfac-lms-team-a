"use client";
import useGetFeedbacks from "@/hooks/reactQuery/useGetFeedbacks";
import React, { useState } from "react";
import FeedbackCard from "./FeedbackCard";
import Card from "../Card";
import FeedbackForm from "./FeedbackForm";
import { useForm } from "react-hook-form";
import { Feedback } from "@/types/firebase.types";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

const Feedback = () => {
  const [isModalOn, setIsModalOn] = useState<string | null>(null);
  // const [isEdit, setIsEdit] = useState<string | null>(null);
  const [isContent, setIsContent] = useState(false);
  // docId === submittedAssignmentId
  // 즉 Dynamic Route는 따로 되지 않으므로 나중에 submittedAssignment 클릭시 이벤트로 id 가져오기
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading } = useGetFeedbacks(docId);
  const useFeedbackForm = useForm<UserFeedback>({
    mode: "onSubmit",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsContent(e.currentTarget.value.trim().length > 1);
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section className="flex flex-col p-5 gap-5">
        {data?.map(feedback => {
          return (
            <Card key={feedback.id} vertical={true}>
              <FeedbackCard
                feedback={feedback}
                docId={docId}
                useFeedbackForm={useFeedbackForm}
                onChangeInput={onChangeInput}
                setIsContent={setIsContent}
                // isEdit={feedback.id === isEdit}
                // setIsEdit={setIsEdit}
                isModalOn={feedback.id === isModalOn}
                setIsModalOn={setIsModalOn}
              />
            </Card>
          );
        })}
        <section className="rounded-lg p-5 border border-grayscale-10">
          <FeedbackForm
            onChangeInput={onChangeInput}
            useFeedbackForm={useFeedbackForm}
            setIsContent={setIsContent}
            isContent={isContent}
            docId={docId}
          />
        </section>
      </section>
    </>
  );
};

export default Feedback;
