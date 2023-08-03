import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { CreateLecture } from "@/app/classroom/(components)/CreateLecture";
import uploadFileToStorage from "@/utils/uploadFileToStorage";

const createLecture = async (lecture: CreateLecture) => {
  let videoUrl = "";
  let q = query(
    collection(db, "lectures"),
    where("courseId", "==", lecture.courseId),
  );
  const querySnapshot = await getDocs(q);
  const orderList: number[] = [0];
  querySnapshot.forEach(doc => {
    if (doc.data().order) {
      orderList.push(doc.data().order);
    }
  });
  const maxOrder = Math.max(...orderList);

  if (lecture.lectureType === "비디오") {
    videoUrl = await uploadFileToStorage(
      "lectures/videos/",
      lecture.lectureContent.video[0],
    );
  }

  const lectureData = {
    ...lecture,
    user: doc(db, "users", lecture.userId),
    course: doc(db, "courses", lecture.courseId),
    order: maxOrder + 1,
    lectureContent: {
      ...lecture.lectureContent,
      video: videoUrl,
    },
  };
  const docRef = await addDoc(collection(db, `lectures`), lectureData);
  console.log(docRef.id);
};

const useCreateLecture = (modalOpenHandler: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreateLecture>(createLecture, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lecture"]);
      modalOpenHandler();
    },
    onError: error => {
      console.log(error);
    },
  });
};

export default useCreateLecture;
