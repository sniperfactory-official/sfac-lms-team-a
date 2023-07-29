import type { LectureComment } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";

const commentInputPost = async ({ sendData }: { sendData: LectureComment }) => {
  const docRef = await addDoc(collection(db, "lectureComments"), sendData);

  return docRef.id;
};

const useLectureCommentMutation = (parentId:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentInputPost,
    onSuccess: (data) => {
      console.log("성공 했을 시", data);
      queryClient.invalidateQueries(["LectureComment", parentId]);
    }, onError: (e:unknown) => {
      console.log("에러가 발생하였습니다.", e);
    }
  });
};

export default useLectureCommentMutation;