import { db } from "@/utils/firebase";
import { getDocs, collection } from "firebase/firestore";

/* 사용안하는훅 */

const getDetailSubmitted = async (docId: string): Promise<string> => {
  let id: string = "";
  const querySnapshot = await getDocs(collection(db, "submittedAssignments"));
  querySnapshot.forEach(doc => {
    if (doc.data().assignmentId.id === docId) {
      // console.log(doc.id)
      id = doc.id;
    }
  });
  return id;
};

// const useGetDetailSubmitted = (submittedId: string) => {
//   const { data, isLoading, error } = useQuery<Assignment>(
//     ["submitted",submittedId],
//     () => getDetailSubmitted(submittedId),
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
//   return { data, isLoading, error };
// }

// export default useGetDetailSubmitted;
