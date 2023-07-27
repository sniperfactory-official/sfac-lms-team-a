import { Feedback } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc } from "firebase/firestore";

interface createFeedbackProps {
  docId: string;
  feedback: Feedback;
}

// docId는 submittedAssignmentId
const createFeedback = async ({ docId, feedback }: createFeedbackProps) => {
  const docRef = await addDoc(
    collection(db, `submittedAssignments/${docId}/feedbacks`),
    {
      // 로그인한 userId 정보 가져오기
      userId: "",
      content: feedback.content,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    },
  );
  console.log("Document written with ID: ", docRef.id);
};
const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate, data, error, reset } = useMutation<
    void,
    Error,
    createFeedbackProps
  >((feedback: createFeedbackProps) => createFeedback(feedback), {
    onMutate: async (newFeedback: createFeedbackProps) => {
      // Optional: 로딩 스피너 관련 함수 업데이트 하고 싶은 경우 사용
      console.log(newFeedback);
    },
    onError: (error, variables, context) => {
      // Optional: 에러 메세지 UI 업데이트 하고 싶은 경우 사용
    },
    onSuccess: (data, variables, context) => {
      // Optional: 입력 성공시 메세지 UI 업데이트 하고 싶은 경우 사용
      queryClient.invalidateQueries(["feedbacks"]);
    },
  });

  return { mutate, data, error, reset };
};

export default useCreateFeedback;
