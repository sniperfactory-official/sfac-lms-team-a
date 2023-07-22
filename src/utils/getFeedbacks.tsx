import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getFeedbacks = async (docId: string) => {
  const querySnapshot = await getDocs(
    collection(db, `submittedAssignments/${docId}/feedbacks`),
  );

  return querySnapshot.docs.map(doc => {
    return doc.data();
  });
};
