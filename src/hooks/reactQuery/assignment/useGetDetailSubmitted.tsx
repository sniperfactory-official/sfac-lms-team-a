// import { Assignment, SubmittedAssignment } from "@/types/firebase.types";
// import { db } from "@/utils/firebase";
// import { useQuery } from "@tanstack/react-query";
// import { getDoc, doc, getDocs, collection, query } from "firebase/firestore";
// //: Promise<string>
// export const getDetailSubmitted = async (
//   docId: string,
// ): Promise<SubmittedAssignment> => {
//   const querySnapshot = await getDocs(collection(db, "submittedAssignments"));
//   return Promise.all(
//     querySnapshot.docs.map(async doc => {
//       const d = doc.data();
//       if (d.assignmentId.id === docId) {
//         return { id: doc.id, ...d } as SubmittedAssignment;
//       }
//     }),
//   );
// };

// const useGetDetailSubmitted = (submittedId: string) => {
//   const { data, isLoading, error } = useQuery<SubmittedAssignment>(
//     ["submitted", submittedId],
//     () => getDetailSubmitted(submittedId),
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
//   return { data, isLoading, error };
// };

// export default useGetDetailSubmitted;

import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const getDetailSubmitted = async (docId: string) => {
  const assignmentRef = doc(db, "assignments", docId);
  const q = query(
    collection(db, "submittedAssignments"),
    where("assignmentId", "==", assignmentRef),
  );
  const querySnapshot = await getDocs(q);
  return Promise.all(
    querySnapshot.docs.map(async doc => {
      return { id: doc.id, ...doc.data() };
    }),
  );
};

const useGetDetailSubmitted = (submittedId: string) => {
  const { data, isLoading, error } = useQuery(
    ["submitted", submittedId],
    () => getDetailSubmitted(submittedId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};
export default useGetDetailSubmitted;
