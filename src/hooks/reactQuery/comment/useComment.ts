import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getComment = async (docId: string) => {
  const commentQuery = query(
    collection(db, "posts"),
    where("parentId", "==", docId),
  );
  const querySnapshot = await getDocs(commentQuery);

  let postComments: DocumentData[] = [];
  for (const doc of querySnapshot.docs) {
    const docData = await doc.data();
    postComments.push(docData);
  }
  return postComments;
};

export default function useFetchUserComment(docId: string) {
  return useQuery(["comment", docId], async () => await getComment(docId));
}
