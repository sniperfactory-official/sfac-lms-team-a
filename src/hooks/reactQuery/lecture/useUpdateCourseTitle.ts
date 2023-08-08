import { db } from "@/utils/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/types/firebase.types";

const updateCourseTitle = async (updateTitle: Course[]) => {
  const batch = writeBatch(db);

  updateTitle.forEach(course => {
    const courseRef = doc(db, "courses", course.id);
    batch.update(courseRef, { title: course.title });
  });
  console.log("updateTitle: ", updateTitle);
  await batch.commit();
};

const useUpdateCourseTitle = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCourseTitle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (e: unknown) => {
      console.log("에러가 발생하였습니다.", e);
    },
  });
};

export default useUpdateCourseTitle;
