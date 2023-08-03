import React, { Dispatch, SetStateAction, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useFeedbackActions } from "./useFeedbackActions";
import { UserFeedback } from "@/types/feedback.types";
import { useForm } from "react-hook-form";
import { Feedback } from "@/types/firebase.types";
import { useReturnToUserRef } from "@/hooks/common/useReturnToUserRef";

const useMutateFeedback = (
  docId: string,
  userId: string,
  feedback: Feedback | undefined,
  setIsEdit: Dispatch<SetStateAction<string | null>>,
) => {
  const [isContent, setIsContent] = useState(false);
  const useFeedbackForm = useForm<UserFeedback>({
    mode: "onSubmit",
    defaultValues: {
      content: feedback?.content,
    },
  });

  const { resetField } = useFeedbackForm;

  const { createFeedback, deleteFeedback, updateFeedback, updateError } =
    useFeedbackActions();

  const handleDeleteFeedback = (e: React.MouseEvent) => {
    // resetField("content", { defaultValue: feedback?.content });
    deleteFeedback({
      docId,
      feedbackId: e.currentTarget.id,
    });
    setIsEdit(null);
  };

  const handleSubmitFeedback = async (data: UserFeedback) => {
    if (data === undefined) return;

    try {
      await createFeedback({
        docId,
        feedback: {
          //   로그인한 유저 id 보내기
          userId: useReturnToUserRef(userId),
          content: data.content,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      resetField("content", { defaultValue: feedback?.content });
      setIsEdit(null);
      setIsContent(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 등록되지 않았습니다.");
    }
  };

  const handleUpdateFeedback = async (data: UserFeedback) => {
    if (feedback === undefined) {
      console.log("feedback이 읽히지 않았습니다.");
      return;
    }

    // console.log(data, "데이터 입력!");

    try {
      await updateFeedback({
        docId,
        feedbackId: feedback.id,
        feedback: {
          //   로그인한 유저 id 보내기
          userId: feedback.userId,
          content: data.content,
          createdAt: feedback.createdAt,
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      setIsEdit(null);
      setIsContent(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 수정되지 않았습니다.");
      console.log(updateError?.message);
    }
  };

  return {
    isContent,
    setIsContent,
    handleDeleteFeedback,
    handleSubmitFeedback,
    handleUpdateFeedback,
    useFeedbackForm,
  };
};

export default useMutateFeedback;
