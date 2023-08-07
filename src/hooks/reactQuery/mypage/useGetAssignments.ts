import { Assignment } from "./../../../types/firebase.types";
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
  console.log("querySnapshot", querySnapshot);

  let myAssignments: DocumentData[] = [];
  for (const docData of querySnapshot.docs) {
    const assignmentDoc = docData.data();
    let submittedData = null;
    let AssignmentData = null;
    console.log("assignmentData", assignmentDoc);

    if (assignmentDoc.submittedAssignmentId instanceof DocumentReference) {
      const lectureSnapshot = await getDoc(assignmentDoc.submittedAssignmentId);
      if (lectureSnapshot.exists()) {
        // const userRef = doc(db, "submittedAssignments", assignmentData.submittedAssignmentId);

        submittedData = lectureSnapshot.data();
        console.log("submittedData", submittedData);

        if (submittedData.assignmentId instanceof DocumentReference) {
          const lectureSnapshot = await getDoc(submittedData.assignmentId);
          if (lectureSnapshot.exists()) {
            AssignmentData = lectureSnapshot.data();
          }
        }
      }
      myAssignments.push({
        id: docData.id,
        submittedData,
        AssignmentData,
        ...assignmentDoc,
      });
    }
  }
  return myAssignments;
};

export default function useGetAssignments(userId: string) {
  return useQuery(
    ["assignment", userId],
    async () => await getAssignments(userId),
  );
}
