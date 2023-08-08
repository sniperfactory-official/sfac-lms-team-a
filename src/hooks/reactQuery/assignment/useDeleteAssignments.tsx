import { db } from "@/utils/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAssignments = async (deleteList: string[]) => {
  const batch = writeBatch(db);

  deleteList.forEach(deleteItem => {
    const documentRef = doc(db, "assignments", deleteItem);
    batch.delete(documentRef);
  });

  await batch.commit();
};

export const useDeleteAssignments = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAssignments, {
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments"]);
      queryClient.refetchQueries(["assignments"]);
    },
    // onError: error => {
    //   console.error(error);
    // },
  });
};
