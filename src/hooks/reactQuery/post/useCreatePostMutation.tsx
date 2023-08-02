import { db } from "@/utils/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { PostValue } from "@/components/Community/PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createPost = async (formData: PostValue) => {
  const docRef = await addDoc(collection(db, "posts"), {
    parentId: "",
    category: formData.category,
    userId: "",
    title: formData.title,
    content: formData.content,
    postImages: formData.postImages,
    thumbnailImages: formData.thumbnailImages,
    tags: formData.tags,
    createdAt: formData.createdAt,
  });
  console.log("docRef", docRef);
};

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: () => {
      console.log("onSuccess !!!");
    },
  });

  return { mutate, isLoading };
};
