import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

const deleteSubmittedAssignment = async (submittedAssignmentId: string) => {
  const submittedAssignmentRef = doc(
    db,
    "submittedAssignments",
    submittedAssignmentId,
  );
  await deleteDoc(submittedAssignmentRef);

  const attachmentSnapshot = await getDocs(
    query(
      collection(db, "attachments"),
      where("submittedAssignmentId", "==", submittedAssignmentRef),
    ),
  );

  const deleteAttachment = attachmentSnapshot.docs.map(async doc => {
    const attachmentRef = doc.ref;
    await deleteDoc(attachmentRef);
  });

  return await Promise.all(deleteAttachment);
};

const useDeleteSubmittedAssignment = (docId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubmittedAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries(["submittedAssignmentId", docId, userId]);
    },
    onError: error => {
      console.error("제출된 과제 삭제 에러: ", error);
    },
  });
};

export default useDeleteSubmittedAssignment;
