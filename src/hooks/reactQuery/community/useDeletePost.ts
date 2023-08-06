import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

const deletePostFromFirebase = async (postId: string): Promise<void> => {
  const db = getFirestore();
  const postRef = doc(db, "posts", postId);
  await deleteDoc(postRef);
};

const useDeletePost = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation(deletePostFromFirebase, {
    onSuccess: () => {
      // 필요한 경우, 여기에서 캐시를 업데이트하거나 다른 작업을 수행
      queryClient.invalidateQueries(["posts"]); // 쿼리를 무효화하여 자동 리프레시
      alert("게시물이 삭제되었습니다!");
    },
    onError: (error: Error) => {
      alert("에러가 발생했습니다!");
    },
  });
};

export default useDeletePost;
