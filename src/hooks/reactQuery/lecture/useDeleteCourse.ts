import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
// 강의 id들어가있는 배열 받아와서 그거 하나씩 삭제하기

const courseDelete = async ({
  lectureId,
  courseId,
}: {
  lectureId: string[];
  courseId: string[];
}) => {
  for (let key of lectureId) {
    const lectureQuery = doc(db, "lectures", key);
    await deleteDoc(lectureQuery);
  }

  for (let key of courseId) {
    const courseQuery = doc(db, "courses", key);
    await deleteDoc(courseQuery);
  }

  return 0;
};

// 데이터를 알아서 패칭해옴. 코스가 자동으로 생김
const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(["lectures"]);
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생하였습니다.", e);
    },
  });
};

export default useDeleteCourse;
