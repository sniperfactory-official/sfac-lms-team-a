// import { Assignment } from "@/types/firebase.types";
// import { db } from "@/utils/firebase";
// import { useQuery } from "@tanstack/react-query";
// import {
//   getDoc,
//   doc,
// } from "firebase/firestore";

// export const getDetailAssignment = async (assignmentId: string): Promise<Assignment> => {
//   const docRef = doc(db, "assignments", assignmentId);
//   const docSnap = await getDoc(docRef);
//   return {...docSnap.data()} as Assignment
// }

// const useGetDetailAssignment = (assignmentId: string) => {
//   const { data, isLoading, error } = useQuery<Assignment>(
//     ["assignments",assignmentId],
//     () => getDetailAssignment(assignmentId),
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
//   return { data, isLoading, error };
// }

// export default useGetDetailAssignment;
import { Assignment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export const getDetailAssignment = async (
  assignmentId: string,
): Promise<Assignment> => {
  const docRef = doc(db, "assignments", assignmentId);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data())
  return { ...docSnap.data() } as Assignment;
};

const useGetDetailAssignment = (assignmentId: string) => {
  const { data, isLoading, error } = useQuery<Assignment>(
    ["assignments", assignmentId],
    () => getDetailAssignment(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

export default useGetDetailAssignment;

export const getUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data() } as User;
};

//: Promise<Assignment>
export const useGetUser = (userId: string) => {
  const { data, isLoading, error } = useQuery<User>(
    ["users", userId],
    () => getUser(userId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

// export const getAttachment = async (
//   userId: string,
// ) => {
//   // const docRef = doc(db, "attachments", userId);
//   // const docSnap = await getDoc(docRef);
//   const querySnapshot = await getDocs(collection(db, "attachments"));
//   return querySnapshot.docs.map(doc => {
//     if(doc.data().submittedAssignmentId.id === userId){
//       return {...doc.data().attachmentFiles}
//     }
//   })
//   // console.log(querySnapshot)
//   // return { ...docSnap.data() };
// };

// export const useGetAttachment = (userId: string) => {
//   const { data, isLoading, error } = useQuery(
//     ["attachments", userId],
//     () => getAttachment(userId),
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
//   return { data, isLoading, error };
// };

//useGetAttachment("gZWELALnKoZLzJKjXGUM")
