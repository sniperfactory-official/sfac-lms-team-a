import { updateDoc, Timestamp, doc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Update = {
  updatedAt: Timestamp;
  content: string;
};
interface updateCommentProps {
  commentId: string;
  content: Update;
}
const updateComment = async ({ commentId, content }: updateCommentProps) => {
  let commentRef;
  commentRef = doc(db, "posts", commentId);
  await updateDoc(commentRef, {
    updatedAt: content.updatedAt,
    content: content.content,
  });
};
const useUpdateComment = () => {
  // QueryClient를 통해 만들어진 객체의 정보를 얻기
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<void, Error, updateCommentProps>(
    // 실행할 함수
    updateComment,
    {
      onMutate: async () => {},
      // 성공했을시
      onSuccess: () => {
        // 쿼리를 무효화 시켜 다시 조회해서 updated 바로 반영 처리
        queryClient.invalidateQueries(["comment"]);
      },
    },
  );
  // 다른 컴포넌트에서 업데이트 작업, 에러 확인 가능.
  return { mutate, error };
};
export default useUpdateComment;
