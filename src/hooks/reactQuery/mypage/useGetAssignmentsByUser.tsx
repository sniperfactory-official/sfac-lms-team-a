import { useQuery } from "@tanstack/react-query";
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Assignment } from "@/types/firebase.types";

const fetchAssignmentsByUser = async (
  userId: string,
): Promise<{ submitted: Assignment[]; unsubmitted: Assignment[] }> => {
  // 제출한 과제 목록에서 해당 사용자가 제출한 과제의 ID 목록을 가져온다.
  const userRef = doc(db, `users/${userId}`);
  const submittedAssignmentsRef = collection(db, "submittedAssignments");
  const submittedQuery = query(
    submittedAssignmentsRef,
    where("userId", "==", userRef),
  );
  const submittedSnapshot = await getDocs(submittedQuery);
  const submittedIds = submittedSnapshot.docs.map(
    doc => doc.data().assignmentId.id,
  );

  // 모든 과제 목록을 가져온다.
  const assignmentsRef = collection(db, "assignments");
  const assignmentsSnapshot: QuerySnapshot = await getDocs(assignmentsRef);

  // 과제 ID를 이용해서 과제를 제출한 것과 제출하지 않은 것으로 분리한다.
  const submitted: Assignment[] = [];
  const unsubmitted: Assignment[] = [];
  assignmentsSnapshot.docs.forEach(doc => {
    const assignment = doc.data() as Assignment;
    if (submittedIds.includes(doc.id)) {
      submitted.push(assignment);
    } else {
      unsubmitted.push(assignment);
    }
  });

  // endDate의 seconds를 오름차순으로 정렬한다.
  submitted.sort((a, b) => a.endDate.seconds - b.endDate.seconds);
  unsubmitted.sort((a, b) => a.endDate.seconds - b.endDate.seconds);

  return { submitted, unsubmitted };
};

export const useGetAssignmentsByUser = (userId: string) => {
  return useQuery(["assignments", userId], () =>
    fetchAssignmentsByUser(userId),
  );
};
