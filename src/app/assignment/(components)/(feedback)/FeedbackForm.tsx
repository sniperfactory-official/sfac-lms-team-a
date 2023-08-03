import useCreateFeedback from "@/hooks/reactQuery/useCreateFeedback";
import { BaseProps, UserFeedback } from "@/types/feedback.types";
import { Timestamp } from "firebase/firestore";
import FeedbackCreate from "./FeedbackCreate";

const FeedbackForm = ({
  onChangeInput,
  useFeedbackForm,
  setIsContent,
  isContent,
  docId,
}: BaseProps) => {
  const createMutation = useCreateFeedback();

  const onSubmitFeedback = async (data: UserFeedback) => {
    if (data === undefined) return;
    try {
      await createMutation.mutate({
        docId,
        feedback: {
          //   로그인한 유저 id 보내기
          userId: data.userId,
          content: data.content,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        },
      });
      useFeedbackForm.reset({ content: "" });
      setIsContent(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      alert("피드백이 성공적으로 등록되지 않았습니다.");
    }
  };

  return (
    <FeedbackCreate
      useFeedbackForm={useFeedbackForm}
      onSubmitFeedback={onSubmitFeedback}
      onChangeInput={onChangeInput}
      isContent={isContent}
    />
  );
};

export default FeedbackForm;
