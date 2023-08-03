import { Assignment, SubmittedAssignment } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc, getDocs, collection, query } from "firebase/firestore";
//: Promise<string>
export const getDetailSubmitted = async (
  docId: string,
): Promise<SubmittedAssignment> => {
  const querySnapshot = await getDocs(collection(db, "submittedAssignments"));
  return Promise.all(
    querySnapshot.docs.map(async doc => {
      const d = doc.data();
      if (d.assignmentId.id === docId) {
        return { id: doc.id, ...d } as SubmittedAssignment;
      }
    }),
  );
};

// querySnapshot.forEach(doc => {
//   if (doc.data().assignmentId.id === docId) {
//     id = doc.id;
//   }
// });

const useGetDetailSubmitted = (submittedId: string) => {
  const { data, isLoading, error } = useQuery<SubmittedAssignment>(
    ["submitted", submittedId],
    () => getDetailSubmitted(submittedId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

export default useGetDetailSubmitted;
