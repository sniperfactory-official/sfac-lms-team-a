import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";
import { Post, User } from "@/types/firebase.types";

import { db } from "@/utils/firebase";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const getNestedComment = async (docId: string) => {
  const commentQuery = query(
    collection(db, "posts"),
    where("parentId", "==", docId),
  );

  const querySnapshot = await getDocs(commentQuery);

  let postComments: DocumentData[] = [];
  for (const doc of querySnapshot.docs) {
    const postData = await doc.data();

    let user: User | null = null;

    if (postData.userId instanceof DocumentReference) {
      const userSnapshot = await getDoc(postData.userId);
      if (userSnapshot.exists()) {
        user = userSnapshot.data() as User;
      }
    }
    postComments.push({ id: doc.id, user, ...postData });
  }

  return postComments;
};

export default function useFetchUserComments(docIds: string[]) {
  const commentQueries = useQueries({
    queries: docIds.map(id => ({
      queryKey: ["comment", id],
      queryFn: () => getNestedComment(id),
    })),
  });

  // 모든 유저 댓글 데이터를 하나의 배열로 결합
  const allCommentData = commentQueries
    .filter(query => query.data !== undefined && query.data !== null)
    .map(query => query.data)
    .flat();
  const isLoading = commentQueries.some(query => query.isLoading);
  const isError = commentQueries.some(query => query.isError);
  const error = commentQueries.find(query => query.error)?.error;

  return {
    data: allCommentData,
    isLoading,
    isError,
    error,
  } as UseQueryResult<DocumentData[], unknown>;
}
