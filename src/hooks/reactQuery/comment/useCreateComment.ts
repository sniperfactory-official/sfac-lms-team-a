import {
  Timestamp,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Write = {
  parentId: string | undefined;
  content: string;
  userId: DocumentReference;
  createdAt: Timestamp;
};

interface createCommentProps {
  post: Write;
}

const createComment = async ({ post }: createCommentProps) => {
  const createRef = await addDoc(collection(db, "posts/"), {
    userId: post.userId,
    parentId: post.parentId,
    content: post.content,
    createdAt: post.createdAt,
  });
};

const useCreateComment = () => {
  //reset: 작성후 초기화 작업
  const queryClient = useQueryClient();
  const { mutate, data, error, reset } = useMutation<
    void,
    Error,
    createCommentProps
  >(createComment, {
    onMutate: async (variables: createCommentProps) => {
      // Optional: 로딩 스피너 관련 함수 업데이트 하고 싶은 경우 사용
    },
    onError: (error, variables, context) => {
      // Optional: 에러 메세지 UI 업데이트 하고 싶은 경우 사용
    },
    onSuccess: (data, variables, context) => {
      // Optional: 입력 성공시 메세지 UI 업데이트 하고 싶은 경우 사용
      queryClient.invalidateQueries(["comment"]);

      // console.log(data);
    },
  });
  return { mutate, data, error, reset };
};

export default useCreateComment;
