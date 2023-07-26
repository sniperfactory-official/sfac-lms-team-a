import { Feedback, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  DocumentReference,
  getDoc,
} from "firebase/firestore";

const getFeedbacks = async (docId: string): Promise<Feedback[]> => {
  const querySnapshot = await getDocs(
    collection(db, `submittedAssignments/${docId}/feedbacks`),
  );

  return Promise.all(
    querySnapshot.docs.map(async doc => {
      const feedbackData = doc.data();
      let user: User | null = null;

      if (feedbackData.userId instanceof DocumentReference) {
        const userSnapshot = await getDoc(feedbackData.userId);
        if (userSnapshot.exists()) {
          user = userSnapshot.data() as User;
        }
      }

      return { id: doc.id, user, ...feedbackData } as Feedback;
    }),
  );
};

const useGetFeedbacks = (docId: string) => {
  const { data, isLoading, error } = useQuery<Feedback[]>(
    ["feedbacks", docId],
    () => getFeedbacks(docId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export default useGetFeedbacks;
