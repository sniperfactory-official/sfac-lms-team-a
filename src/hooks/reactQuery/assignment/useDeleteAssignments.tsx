import { db } from "@/utils/firebase";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteAssignments = async (deleteList: string[]) => {
  // console.log(deleteList);
  const batch = writeBatch(db);

  deleteList.forEach(deleteItem => {
    const documentRef = doc(db, "assignments", deleteItem);
    batch.delete(documentRef);
  });

  // assignment삭제시 그삭제된 id참조해서 submittedAssignment도 삭제
  const submittedAssignmentsRef = collection(db, "submittedAssignments");
  const submittedAssignmentsSnapshot = await getDocs(submittedAssignmentsRef);

  const submitAssignmentsDeleteList: string[] = [];

  submittedAssignmentsSnapshot.forEach(doc => {
    const data = doc.data();
    if (deleteList.includes(data.assignmentId.id))
      submitAssignmentsDeleteList.push(doc.id);
  });

  submitAssignmentsDeleteList.forEach(deleteItem => {
    const documentRef = doc(db, "submittedAssignments", deleteItem);
    batch.delete(documentRef);
  });
  // console.log(submitAssignmentsDeleteList);

  // submittedAssignment삭제시 그삭제된 id참조해서 attachment도 삭제
  const attachmentsRef = collection(db, "attachments");
  const attachmentsSnapshot = await getDocs(attachmentsRef);

  const attachmentsDeleteList: string[] = [];

  attachmentsSnapshot.forEach(doc => {
    const data = doc.data();
    if (submitAssignmentsDeleteList.includes(data.submittedAssignmentId.id))
      attachmentsDeleteList.push(doc.id);
  });
  // console.log(attachmentsDeleteList);

  attachmentsDeleteList.forEach(deleteItem => {
    const documentRef = doc(db, "attachments", deleteItem);
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

// const deleteSubmittedAssginments = async (deleteAssignmentsList: string[]) => {
//   const batch = writeBatch(db);
//   const submittedAssignmentsRef = collection(db, "submittedAssignments");
//   const submittedAssignmentsSnapshot = await getDocs(submittedAssignmentsRef);

//   const submitAssignmentsDeleteList: string[] = [];

//   submittedAssignmentsSnapshot.forEach(doc => {
//     const data = doc.data();
//     if (deleteAssignmentsList.includes(data.assignmentId.id))
//       submitAssignmentsDeleteList.push(doc.id);
//   });

//   submitAssignmentsDeleteList.forEach(deleteItem => {
//     const documentRef = doc(db, "submittedAssignments", deleteItem);
//     batch.delete(documentRef);
//   });

//   await batch.commit();
// };
// const deleteAttachments = async (deleteAttachmentsList: string[]) => {
//   const batch = writeBatch(db);
//   const attachmentsRef = collection(db, "attachments");
//   const attachmentsSnapshot = await getDocs(attachmentsRef);

//   const attachmentsDeleteList: string[] = [];

//   attachmentsSnapshot.forEach(doc => {
//     const data = doc.data();
//     if (deleteAttachmentsList.includes(data.submittedAssignmentId.id))
//       attachmentsDeleteList.push(doc.id);
//   });

//   attachmentsDeleteList.forEach(deleteItem => {
//     const documentRef = doc(db, "attachments", deleteItem);
//     batch.delete(documentRef);
//   });

//   await batch.commit();
// };
