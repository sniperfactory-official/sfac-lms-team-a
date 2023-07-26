import { LectureComment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fetchLectureComment = async (docId: string) => {
  const q = query(
    collection(db, "lectureComments"),
    where("lectureId", "==", doc(db, "lectures", docId)),
  );

  const letcureComments: DocumentData[] = [];
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const docData = doc.data();
      const userSnap = await getDoc(docData.userId);
    const user = await userSnap.data() as User;

      letcureComments.push({ ...docData,user });
  }
  return letcureComments;
};

const useGetLectureCommentQuery = (docId: string) => {
  return useQuery(
    ["LectureComment", docId],
    async () => await fetchLectureComment(docId),
    { refetchOnWindowFocus: false },
  );
};
export default useGetLectureCommentQuery;
