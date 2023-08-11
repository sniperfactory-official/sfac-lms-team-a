import { db } from "@/utils/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

const lectureDelete = async ({ lectureId }: { lectureId: string }) => {
  const lectureQuery = doc(db, "lectures", lectureId);
  await deleteDoc(lectureQuery);
  return 0;
};

const useDeleteLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: lectureDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["lecture"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생했습니다.", e);
    },
  });
};

export default useDeleteLecture;
