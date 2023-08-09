import { DeleteFeedbackProps } from "@/types/feedback.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

const deleteFeedback = async ({ docId, feedbackId }: DeleteFeedbackProps) => {
  await deleteDoc(
    doc(db, `submittedAssignments/${docId}/feedbacks`, feedbackId),
  );
};

const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<void, Error, DeleteFeedbackProps>(
    deleteFeedback,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feedbacks"]);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  return { mutate, error };
};

export default useDeleteFeedback;
