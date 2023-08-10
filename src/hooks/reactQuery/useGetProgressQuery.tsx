import { db } from "@utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  DocumentData,
} from "firebase/firestore";
const fetchUserLectures = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const q = query(collection(db, "progress"), where("userId", "==", userRef));
  const querySnapshot = await getDocs(q);
  let progress: DocumentData[] = [];
  for (const doc of querySnapshot.docs) {
    progress.push(doc.data());
  }

  const completedLectures = progress.filter(
    lecture => lecture.isCompleted === true,
  ).length;
  return { total: progress.length, completedLectures: completedLectures };
};

const useGetProgressInfoQuery = (userId: string) => {
  return useQuery(
    ["userLectures", userId],
    async () => await fetchUserLectures(userId),
    { refetchOnWindowFocus: false },
  );
};

export default useGetProgressInfoQuery;
