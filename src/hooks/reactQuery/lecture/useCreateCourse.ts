import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const createCourse = async (order: number) => {
  console.log(1);
  const docRef = await addDoc(collection(db, "courses"), {
    createdAt: Timestamp.now(),
    title: "새로운섹션",
    updatedAt: Timestamp.now(),
    order,
  });
  console.log("docRef: ", docRef);
};

// 데이터를 알아서 패칭해옴. 코스가 자동으로 생김
const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: data => {
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생하였습니다.", e);
    },
  });
};

export default useCreateCourse;
