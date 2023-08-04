import type { LectureComment } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

export interface sendCommentDataType {
  content: string;
  letcurId: string;
  parentId: string;
  uid: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  replyCount: number;
}

const commentInputPost = async ({
  sendData,
}: {
  sendData: sendCommentDataType;
}) => {
  if (sendData.replyCount > 0) {
    const parentComment = doc(db, "lectureComments", sendData.parentId);
    await updateDoc(parentComment, { replyCount: sendData.replyCount });
  }
  const docRef = await addDoc(collection(db, "lectureComments"), {
    content: sendData.content,
    createdAt: sendData.createdAt,
    lectureId: doc(db, "lectures", sendData.letcurId),
    parentId: sendData.parentId,
    replyCount: 0,
    timestamp: "",
    updatedAt: sendData.updatedAt,
    userId: doc(db, "users", sendData.uid),
  });

  return docRef.id;
};

const useLectureCommentMutation = (parentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentInputPost,
    onSuccess: data => {
      queryClient.invalidateQueries(["LectureComment"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생하였습니다.", e);
    },
  });
};

export default useLectureCommentMutation;
