import { db } from "@/utils/firebase";
import { writeBatch, doc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Assignment } from "@/types/firebase.types";

const updateAssignmentsOrder = async (updatedList: Assignment[]) => {
  const batch = writeBatch(db);

  updatedList.forEach(assignment => {
    const assignmentRef = doc(db, "assignments", assignment.id);
    batch.update(assignmentRef, { order: assignment.order });
  });

  await batch.commit();
};

export const useUpdateAssignmentsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAssignmentsOrder, {
    onSuccess: () => queryClient.invalidateQueries(["assignments"]),
  });
};
