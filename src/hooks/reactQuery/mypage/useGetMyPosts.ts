import {
  DocumentData,
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";
import { Post, User } from "@/types/firebase.types";

import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getMyPosts = async (userId: string) => {
  const userRef = doc(db, "users", userId);

  const postQuery = query(
    collection(db, "posts"),
    where("userId", "==", userRef),
  );

  const querySnapshot = await getDocs(postQuery);

  let myPosts: DocumentData[] = [];
  for (const docData of querySnapshot.docs) {
    const postData = docData.data();
    if (postData.parentId) {
      const postRef = doc(db, "posts", postData.parentId);
      const postSnap = await getDoc(postRef);
      const parentData = postSnap.data();
      myPosts.push({ id: docData.id, parentData, ...postData });
    } else {
      myPosts.push({ id: docData.id, ...postData });
    }
  }
  return myPosts;
};

export default function useGetMyPosts(userId: string) {
  return useQuery(["post", userId], async () => await getMyPosts(userId));
}
