import { db } from "@/utils/firebase";
import { writeBatch, doc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Lecture } from "@/types/firebase.types";

const updateLectureOrder = async (updatedList: Lecture[]) => {
  const batch = writeBatch(db);

  updatedList.forEach(lecture => {
    const lectureRef = doc(db, "lectures", lecture.id);
    batch.update(lectureRef, { order: lecture.order });
  });

  await batch.commit();
};

// updateLectureOrder 여기에 반영된 내용을 바탕으로 리액트 쿼리가 해당 lecture라는 키값을 가진 컬렉션을 업데이트 해준다.
export const useUpdateLectureOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLectureOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lecture"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생하였습니다.", e);
    },
  });
};

export default useUpdateLectureOrder;
