import { db } from "@/utils/firebase";
import { addDoc, collection, DocumentReference } from "firebase/firestore";
import { PostValue } from "@/components/Community/PostForm";
import { useMutation } from "@tanstack/react-query";

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

export const usePostMutation = options => {
  return useMutation(createPost, {
    ...options,
  });
};
