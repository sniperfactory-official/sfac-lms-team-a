import {
  query,
  collection,
  updateDoc,
  Timestamp,
  where,
  getDocs,
  doc,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Update = {
  updatedAt: Timestamp;
  content: string;
};

interface updateCommentProps {
  parentId: string;
  content: Update;
}

const updateComment = async ({ parentId, content }: updateCommentProps) => {
  const commentsCollection = collection(db, "posts");
  const updateData = query(
    commentsCollection,
    where("parentId", "==", parentId),
  );

  const querySnapshot = await getDocs(updateData);
  querySnapshot.forEach(async docSnapshot => {
    const commentRef = doc(db, "posts", docSnapshot.id);
    await updateDoc(commentRef, {
      updatedAt: content.updatedAt,
      content: content.content,
    });
  });
};

const useUpdateComment = () => {
  // QueryClient를 통해 만들어진 객체의 정보를 얻기
  // key값 == UseQuery 첫 번째 인자(이름)
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation<void, Error, updateCommentProps>(
    // 실행할 함수
    updateComment,
    {
      // 성공했을시
      onSuccess: data => {
        // 쿼리를 무효화 시켜 다시 조회해서 updated 바로 반영 처리
        queryClient.invalidateQueries(["updateComments"]);
        console.log(data);
      },
    },
  );
  // 다른 컴포넌트에서 업데이트 작업, 에러 확인 가능.
  return { mutate, error };
};

export default useUpdateComment;
