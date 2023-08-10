import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const progressModify = async ({
  lectureId,
  userId,
  progressId,
  start,
  end,
  isCompleted,
}: {
  lectureId: string;
  userId: string;
  progressId: string;
  start: string;
  end: string;
  isCompleted: boolean;
}) => {
  if (progressId === "") {
    const docRef = await addDoc(collection(db, "progress"), {
      isCompleted,
      lectureId: doc(db, "lectures", lectureId),
      playtimes: [
        {
          start,
          end,
        },
      ],
      userId: doc(db, "users", userId),
    });
    return docRef;
  } else {
    const docRef = doc(db, "progress", progressId);
    await updateDoc(docRef, {
      isCompleted,
      playtimes: [
        {
          start,
          end,
        },
      ],
    });
    return "";
  }
};

const useProgressMutateion = (lectureId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: progressModify,
    onSuccess: data => {
      console.log(data);
      if (data !== "") {
        queryClient.invalidateQueries(["progress", lectureId]);
      }
    },
  });
};

export default useProgressMutateion;
