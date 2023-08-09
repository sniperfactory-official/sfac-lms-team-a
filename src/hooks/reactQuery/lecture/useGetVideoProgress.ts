import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fetchVideoProgress = async (lectureId: string, userId: string) => {
  const q = query(
    collection(db, "progress"),
    where("lectureId", "==", doc(db, "lectures", lectureId)),
    where("userId", "==", doc(db, "users", userId)),
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  console.log(querySnapshot.docs.length);

  if (querySnapshot.docs.length > 0) {
    return {
      lectureId: querySnapshot.docs[0].data().lectureId,
      userId: querySnapshot.docs[0].data().userId,
      isCompleted: querySnapshot.docs[0].data().isCompleted,
      playTimes: querySnapshot.docs[0].data().playtimes,
      id: querySnapshot.docs[0].id,
    };
  }
  return null;
};

const useGetVideoProgress = (lectureId: string, userId: string) => {
  return useQuery(
    ["progress", lectureId],
    async () => {
      return await fetchVideoProgress(lectureId, userId);
    },
    { refetchOnWindowFocus: false },
  );
};

export default useGetVideoProgress;
