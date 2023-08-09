import { Assignment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";

const getAssignments = async (): Promise<Assignment[]> => {
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
  } = useQuery<Assignment[], Error>(["assignments"], getAssignments, {
    refetchOnWindowFocus: false,
  });
  const sortingData = originalData?.slice().sort((a, b) => a.order - b.order);
  // return { data, isLoading, error, isSuccess };
  return { data: sortingData, isLoading, error };
};
