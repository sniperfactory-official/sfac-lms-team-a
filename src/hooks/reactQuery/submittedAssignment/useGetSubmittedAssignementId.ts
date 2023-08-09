import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const getSubmittedAssignmentId = async (
  docId: string,
  userId: string,
) => {
  const submittedAssignmentsCollectionRef = collection(
    db,
    "submittedAssignments",
  );
  const querySnapshot = await getDocs(
    query(
      submittedAssignmentsCollectionRef,
      where("assignmentId", "==", doc(db, "assignments", docId)),
      where("userId", "==", doc(db, "users", userId)),
    ),
  );

  if (querySnapshot.size === 0) {
    return null;
  }

  const submittedAssignmentDoc = querySnapshot.docs[0];
  const submittedAssignmentId = submittedAssignmentDoc.id;

  return submittedAssignmentId;
};

export const useGetSubmittedAssignmentId = (docId: string, userId: string) => {
  return useQuery(
    ["submittedAssignmentId", docId, userId],
    () => getSubmittedAssignmentId(docId, userId),
    {
      refetchOnWindowFocus: false,
    },
  );
};
