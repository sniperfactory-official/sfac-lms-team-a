import { Post, User } from "@/types/firebase.types";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentReference,
  query,
  where,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getSelectedPost = async (category: string): Promise<Feedback[]> => {
  const q = query(collection(db, "posts"), where("category", "==", category));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  return Promise.all(
    querySnapshot.docs.map(async doc => {
      const postData = doc.data();
      let user: User | null = null;

      if (postData.userId instanceof DocumentReference) {
        const userSnapshot = await getDoc(postData.userId);
        if (userSnapshot.exists()) {
          user = userSnapshot.data() as User;
        }
      }

      return { id: doc.id, user, ...postData } as Post;
    }),
  );
};
export default function fetchSelectedPost(category: string) {
  return useQuery(
    ["posts", category],
    async () => await getSelectedPost(category),
  );
}
