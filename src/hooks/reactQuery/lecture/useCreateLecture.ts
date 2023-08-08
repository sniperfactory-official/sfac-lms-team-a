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
import { LectureInfo } from "@/app/classroom/(components)/CreateLecture";
import uploadFileToStorage from "@/utils/uploadFileToStorage";

const createLecture = async ({
  lecture,
  userId,
  courseId,
}: {
  lecture: LectureInfo;
  userId: string;
  courseId: string;
}) => {
  let videoUrl = "";
  let q = query(collection(db, "lectures"), where("course", "==", courseId));
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
    course: courseId,
    userId: doc(db, "users", userId),
    courseId: doc(db, "courses", courseId),
    order: maxOrder + 1,
    lectureContent: {
      images: lecture.lectureContent.images,
      textContent: lecture.lectureContent.textContent,
      externalLink: lecture.lectureContent.externalLink,
      videoUrl: videoUrl,
      videoLength: lecture.lectureContent.videoLength,
    },
  };
  const docRef = await addDoc(collection(db, `lectures`), lectureData);
  console.log(docRef.id);
};

const useCreateLecture = (modalOpenHandler: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(createLecture, {
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
