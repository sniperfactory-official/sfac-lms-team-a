import { Feedback, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  DocumentReference,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";

const getFeedbacks = async (docId: string): Promise<Feedback[]> => {
  const q = query(
    collection(db, `submittedAssignments/${docId}/feedbacks`),
    orderBy("createdAt"),
  );

  const querySnapshot = await getDocs(q);

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

  // prefetch 사용할 경우 (getQueryData로 데이터를 가져와서 사용할지 고민, isloading이나 error 메세지를 따로 설정해야한다는 단점이 있음.)
  const queryClient = useQueryClient();
  const [isPrefetched, setIsPrefetched] = useState(false);
  const handleMouseOver = async () => {
    if (!isPrefetched) {
      await queryClient.prefetchQuery(["feedbacks", docId], () =>
        getFeedbacks(docId),
      );
      setIsPrefetched(true);
    }
  };

  return { data, isLoading, error, handleMouseOver };
};

export default useGetFeedbacks;
