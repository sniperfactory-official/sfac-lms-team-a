import { Assignment } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  getDoc,
  doc,
} from "firebase/firestore";

export const getDetailAssignment = async (assignmentId: string): Promise<Assignment> => {
  const docRef = doc(db, "assignments", assignmentId);
  const docSnap = await getDoc(docRef);
  return {...docSnap.data()} as Assignment
}

const useGetDetailAssignment = (assignmentId: string) => {  
  const { data, isLoading, error } = useQuery<Assignment>(
    ["assignments",assignmentId],
    () => getDetailAssignment(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
}

export default useGetDetailAssignment;