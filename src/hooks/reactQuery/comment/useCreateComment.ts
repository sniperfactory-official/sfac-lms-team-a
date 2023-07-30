import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/types/firebase.types";

type Write = {
  content: string;
  createdAt: Timestamp;
};

interface createCommentProps {
  post: Write;
}

const createComment = async ({ post }: createCommentProps) => {
  const createRef = await addDoc(collection(db, "posts/"), {
    content: post.content,
    createdAt: post.createdAt,
  });
  console.log("Document written with :", createRef);
};

const useCreateComment = () => {
  //reset: 작성후 초기화 작업
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
      console.log(data);
    },
  });
  return { mutate, data, error, reset };
};

export default useCreateComment;
