import { AttachmentFile } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

// TODO: 리액트 쿼리 hook으로 refactoring 필요
export const createSubmittedAssignment = async (
  assignmentId: string,
  userId: string,
) => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);
    const userRef = doc(db, "users", userId);

    const submittedAssignmentRef = await addDoc(
      collection(db, "submittedAssignments"),
      {
        assignmentId: assignmentRef,
        userId: userRef,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isRead: false,
      },
    );

    return submittedAssignmentRef.id;
  } catch (error) {
    console.error("assignment 제출 에러: ", error);
    throw error;
  }
};

export const createAttachment = async (
  submittedAssignmentId: string,
  userId: string,
  links?: string[],
  files?: AttachmentFile[],
) => {
  try {
    const submittedAssignmentRef = doc(
      db,
      "submittedAssignments",
      submittedAssignmentId,
    );
    const userRef = doc(db, "users", userId);

    let attachmentRef;

    if (links) {
      attachmentRef = await addDoc(collection(db, "attachments"), {
        submittedAssignmentId: submittedAssignmentRef,
        userId: userRef,
        links,
      });
    }

    if (files) {
      attachmentRef = await addDoc(collection(db, "attachments"), {
        submittedAssignmentId: submittedAssignmentRef,
        userId: userRef,
        attachmentFiles: files,
      });
    }

    return attachmentRef?.id;
  } catch (error) {
    console.error("attachment 제출 에러: ", error);
  }
};
