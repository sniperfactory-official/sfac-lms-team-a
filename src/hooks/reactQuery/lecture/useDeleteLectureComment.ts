import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const commentDelete = async (commentId: string) => {
  // 답글 달린게 있다면 지우기
  const commentQuery = query(
    collection(db, "lectureComments"),
    where("parentId", "==", commentId),
  );

  const querySnapshot = await getDocs(commentQuery);

  const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);

  const docRef = doc(db, "lectureComments", commentId);
  const commentSnapshot = await getDoc(docRef);
  const docData = commentSnapshot.data();

  // 답글을 지우는 경우라면 부모의 답글 갯수 -1 하기
  if (docData !== undefined && docData.parentId) {
    const parentRef = doc(db, "lectureComments", docData.parentId);
    const parentSnapshot = await getDoc(parentRef);
    const parentData = parentSnapshot.data();
    if (parentData) {
      const updateReplyCount = parentData.replyCount - 1;
      await updateDoc(parentRef, { replyCount: updateReplyCount });
    }
  }
  // 댓글 지우기
  const result = await deleteDoc(docRef);

  return result;
};

const useDeleteLectureCommentMutation = (lectureId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentDelete,
    onSuccess: data => {
      queryClient.invalidateQueries(["LectureComment"]);
    },
  });
};

export default useDeleteLectureCommentMutation;
