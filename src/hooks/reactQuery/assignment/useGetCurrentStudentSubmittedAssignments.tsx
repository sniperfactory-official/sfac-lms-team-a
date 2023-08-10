import { useQuery } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const getCurrentStudentSubmittedAssignments = async (
  userId: string,
): Promise<string[]> => {
  const submittedAssignmentsRef = collection(db, "submittedAssignments");
  const submittedAssignmentsSnapshot = await getDocs(submittedAssignmentsRef);

  const assignmentIds: string[] = [];

  submittedAssignmentsSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.userId.id === userId) assignmentIds.push(data.assignmentId.id);
  });
  return assignmentIds;
};

export const useGetCurrentStudentSubmittedAssignments = (
  userId: string,
  role: string,
) => {
  return useQuery<string[]>(
    ["allSubmittedAssignments", userId],
    () => getCurrentStudentSubmittedAssignments(userId),
    {
      refetchOnWindowFocus: false,
      enabled: role === "수강생",
    },
  );
};
