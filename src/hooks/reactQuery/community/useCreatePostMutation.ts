import { db } from "@/utils/firebase";
import { addDoc, collection, DocumentReference } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { PostValue } from "@/components/Community/PostForm/PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePostProps {
  data: PostValue;
  userRef: DocumentReference;
}

export const createPost = async ({ data, userRef }: CreatePostProps) => {
  await addDoc(collection(db, "posts"), {
    parentId: "",
    category: data.category,
    userId: userRef,
    title: data.title,
    content: data.content,
    postImages: data.postImages,
    thumbnailImages: data.thumbnailImages,
    tags: data.tags,
    createdAt: data.createdAt,
  });
};

export const useCreatePostMutation = (options: any) => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: () => {
      options.onSuccess();
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error: FirebaseError) => {
      console.log("에러!! :: ", error);
      options.onError(error);
    },
  });
};
