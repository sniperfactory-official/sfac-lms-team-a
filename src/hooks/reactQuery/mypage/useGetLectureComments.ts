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

const getLectureComments = async (userId: string) => {
  const userRef = doc(db, "users", userId);

  const postQuery = query(
    collection(db, "lectureComments"),
    where("userId", "==", userRef),
  );

  const querySnapshot = await getDocs(postQuery);

  let myPosts: DocumentData[] = [];
  for (const docData of querySnapshot.docs) {
    const postData = docData.data();

    let parentData = null;

    if (postData.lectureId instanceof DocumentReference) {
      const lectureSnapshot = await getDoc(postData.lectureId);
      if (lectureSnapshot.exists()) {
        parentData = lectureSnapshot.data();
      }
    }

    myPosts.push({ id: docData.id, parentData, ...postData });
  }
  return myPosts;
};

export default function useGetLectureComments(userId: string) {
  return useQuery(
    ["lecture", userId],
    async () => await getLectureComments(userId),
  );
}
