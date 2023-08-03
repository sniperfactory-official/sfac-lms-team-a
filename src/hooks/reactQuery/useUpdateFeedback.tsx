import { Feedback } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentReference, doc, updateDoc } from "firebase/firestore";

// createFeedbackProps에서 extends해도 될 것 같음
interface updateFeedbackProps {
  docId: string;
  feedbackId: string;
  feedback: Pick<Feedback, Exclude<keyof Feedback, "id">>;
}

const updateFeedback = async ({
  docId,
  feedbackId,
  feedback,
}: updateFeedbackProps) => {
  const feedbackRef: DocumentReference = doc(
    db,
    `submittedAssignments/${docId}/feedbacks`,
    feedbackId,
  );
  await updateDoc(feedbackRef, {
    updatedAt: feedback.updatedAt,
    content: feedback.content,
  });
};

const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate, error, reset } = useMutation<
    void,
    Error,
    updateFeedbackProps
  >(
    updateFeedback,
    // 수정기능 미완성
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feedbacks"]);
      },
    },
  );

  return { mutate, error, reset };
};

export default useUpdateFeedback;
