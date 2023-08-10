import {
  DocumentData,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";
import { Post, User } from "@/types/firebase.types";

import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getComment = async (docId: string) => {
  const commentQuery = query(
    collection(db, "posts"),
    where("parentId", "==", docId),
    orderBy("createdAt", "asc"),
  );
  const querySnapshot = await getDocs(commentQuery);

  let postComments: DocumentData[] = [];
  for (const doc of querySnapshot.docs) {
    const postData = doc.data();

    let user: User | null = null;

    if (postData.userId instanceof DocumentReference) {
      const userSnapshot = await getDoc(postData.userId);
      if (userSnapshot.exists()) {
        user = userSnapshot.data() as User;
      }
    }

    postComments.push({ id: doc.id, user, ...postData });
  }
  return postComments;
};

export default function useFetchUserComment(docId: string) {
  return useQuery(["comment", docId], async () => await getComment(docId));
}
