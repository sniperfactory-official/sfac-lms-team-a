import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";

function fetchCommentCount(postId: string) {
  return async () => {
    const q = query(collection(db, "posts"), where("parentId", "==", postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size; // 댓글의 개수를 반환
  };
}

export const useCommentCount = (postId: string) => {
  return useQuery(["commentCount", postId], fetchCommentCount(postId));
};
