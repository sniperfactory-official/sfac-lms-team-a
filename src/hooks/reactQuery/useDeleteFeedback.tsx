import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

interface deleteFeedbackProps {
  docId: string;
  feedbackId: string;
}

const deleteFeedback = async ({ docId, feedbackId }: deleteFeedbackProps) => {
  await deleteDoc(
    doc(db, `submittedAssignments/${docId}/feedbacks`, feedbackId),
  );
};

const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<void, Error, deleteFeedbackProps>(
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
