import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const commentModify = async (sendData: { content: string; id: string }) => {
  console.log("수정하는 훅으로 들어옴", sendData);
  try {
    const docRef = doc(db, "lectureComments", sendData.id);
    await updateDoc(docRef, { content: sendData.content });
  } catch (e) {
    console.log(e);
  }
};

const useModifyLectureComment = ({ lectureId }: { lectureId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentModify,
    onSuccess: data => {
      queryClient.invalidateQueries(["LectureComment"]);
    },
  });
};

export default useModifyLectureComment;
