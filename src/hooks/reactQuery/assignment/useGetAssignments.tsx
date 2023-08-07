import { Assignment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";

const fetchAssignments = async (): Promise<Assignment[]> => {
  const assignmentsCollection = collection(db, "assignments");
  const assignmentsSnapshot = await getDocs(query(assignmentsCollection));
  const assignments: Assignment[] = [];

  assignmentsSnapshot.forEach(doc => {
    assignments.push({
      id: doc.id,
      ...doc.data(),
    } as Assignment);
  });

  return assignments;
};

export const useGetAssignments = () => {
  const {
    data: originalData,
    isLoading,
    error,
  } = useQuery<Assignment[], Error>(["assignments"], fetchAssignments, {
    refetchOnWindowFocus: false,
  });

  const data = originalData?.slice().sort((a, b) => {
    if (a.order === undefined && b.order === undefined) return 0;
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  });

  return { data, isLoading, error };
};

// export const useGetAssignments = () => {
//   // const { data, isLoading, error } = useQuery<Assignment[], Error>(
//   //   ["assignments"],
//   //   fetchAssignments,
//   //   {
//   //     refetchOnWindowFocus: false,
//   //   },
//   // );
//   const { data, isLoading, error } = useQuery<Assignment[], Error>(
//     ["assignments"],
//     fetchAssignments,
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
//   console.log(data);

//   return { data, isLoading, error };
//   // return useQuery<Assignment[], Error>(["assignments"], fetchAssignments);
// };
