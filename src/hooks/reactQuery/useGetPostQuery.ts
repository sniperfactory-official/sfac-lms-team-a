import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getPost = async (postId: string) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    return postSnap.data();
  } else {
    throw new Error("Post not found");
  }
};

export default function useGetPost(postId: string) {
  return useQuery(["posts", postId], async () => await getPost(postId));
}
