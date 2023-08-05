import { Post, User } from "@/types/firebase.types";

import { doc, getDoc, DocumentReference } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getPost = async (postId: string): Promise<Post> => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  const postData = postSnap.data();

  // if (postSnap.exists()) {
  //   return postSnap.data();
  // } else {
  //   throw new Error("Post not found");
  // }

  let user: User | null = null;

  if (postData?.userId instanceof DocumentReference) {
    const userSnapshot = await getDoc(postData.userId);
    if (userSnapshot.exists()) {
      user = userSnapshot.data() as User;
    }
  }

  return { user, ...postData } as Post;
};

export default function useGetSelectedPost(postId: string) {
  return useQuery(["posts", postId], async () => await getPost(postId));
}
