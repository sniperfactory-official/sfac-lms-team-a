import { Feedback } from "@/types/firebase.types";
import useDeleteFeedback from "./useDeleteFeedback";
import useUpdateFeedback from "./useUpdateFeedback";
import useCreateFeedback from "./useCreateFeedback";
import {
  CreateFeedbackProps,
  DeleteFeedbackProps,
  UpdateFeedbackProps,
} from "@/types/feedback.types";

export const useFeedbackActions = () => {
  const deleteMutation = useDeleteFeedback();
  const updateMutation = useUpdateFeedback();
  const createMutation = useCreateFeedback();

  const deleteFeedback = (data: DeleteFeedbackProps) => {
    return deleteMutation.mutate(data);
  };

  const updateFeedback = (data: UpdateFeedbackProps) => {
    return updateMutation.mutate(data);
  };

  const createFeedback = (data: CreateFeedbackProps) => {
    return createMutation.mutate(data);
  };

  return {
    deleteFeedback,
    updateFeedback,
    createFeedback,
    deleteError: deleteMutation.error,
    updateError: updateMutation.error,
    createError: createMutation.error,
  };
};
