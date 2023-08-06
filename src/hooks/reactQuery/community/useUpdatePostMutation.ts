import { updateDoc, Timestamp, doc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

type UpdatePostInfo = {
  title: string;
  content: string;
  tags?: string[];
  category: string;
  postImages: string[];
  thumbnailImages: string[];
  updatedAt: Timestamp;
};

interface UpdatePostProps {
  data: UpdatePostInfo;
  postId: string;
}

const updatePost = async ({ data, postId }: UpdatePostProps) => {
  let postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    title: data.title,
    content: data.content,
    tags: data.tags,
    category: data.category,
    postImages: data.postImages,
    thumbnailImages: data.thumbnailImages,
    updatedAt: data.updatedAt,
  });
};

export const useUpdatePostMutation = (options: any) => {
  const queryClient = useQueryClient();

  return useMutation(updatePost, {
    // onMutate: (newData) => {
    //   // 백업본 저장
    //   const previousData = queryClient.getQueryData('data')

    //   // Optimistic update
    //   queryClient.setQueryData('data', newData)

    //   // 롤백 함수 반환
    //   return () => queryClient.setQueryData('data', previousData)
    // },
    onSuccess: () => {
      options.onSuccess();
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error: FirebaseError) => {
      console.log("에러!! :: ", error);
    },
  });
};
