import {
  DocumentData,
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";

import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getAssignments = async (userId: string) => {
  const userRef = doc(db, "users", userId);

  const attachmentQuery = query(
    collection(db, "attachments"),
    where("userId", "==", userRef),
  );
  const querySnapshot = await getDocs(attachmentQuery);

  let myAssignments: DocumentData[] = [];
  for (const docData of querySnapshot.docs) {
    const assignmentDoc = docData.data();
    let content = null;
    let submittedData = null;
    let AssignmentData = null;

    if (assignmentDoc.submittedAssignmentId instanceof DocumentReference) {
      const lectureSnapshot = await getDoc(assignmentDoc.submittedAssignmentId);
      if (lectureSnapshot.exists()) {
        submittedData = lectureSnapshot.data();
        if (submittedData.assignmentId instanceof DocumentReference) {
          const lectureSnapshot = await getDoc(submittedData.assignmentId);
          if (lectureSnapshot.exists()) {
            AssignmentData = lectureSnapshot.data();
          }
        }
      }
      content = assignmentDoc.links;

      myAssignments.push({
        id: docData.id,
        content: content,
        createdAt: submittedData.createdAt,
        submittedData,
        AssignmentData,
        ...assignmentDoc,
      });
    }
  }
  return myAssignments || [];
};

export default function useGetAssignments(userId: string) {
  return useQuery(
    ["assignment", userId],
    async () => await getAssignments(userId),
    {
      retry: 1,
    },
  );
}
