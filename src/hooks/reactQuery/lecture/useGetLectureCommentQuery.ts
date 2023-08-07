import { LectureComment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  OrderByDirection,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const fetchLectureComment = async (
  docId: string,
  parentId: string,
  order: OrderByDirection,
) => {
  const q = query(
    collection(db, "lectureComments"),
    orderBy("createdAt", order),
    where("lectureId", "==", doc(db, "lectures", docId)),
    where("parentId", "==", parentId),
  );
  const letcureComments: DocumentData[] = [];
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const docData = doc.data();
    const commentId = doc.id;
    const userSnap = await getDoc(docData.userId);
    const user = (await userSnap.data()) as User;
    letcureComments.push({ id: commentId, ...docData, user });
  }
  return letcureComments;
};

const useGetLectureCommentQuery = (
  docId: string,
  parentId: string,
  order: OrderByDirection = "desc",
) => {
  return useQuery(
    ["LectureComment", docId, parentId],
    async () => await fetchLectureComment(docId, parentId, order),
    { refetchOnWindowFocus: false },
  );
};
export default useGetLectureCommentQuery;