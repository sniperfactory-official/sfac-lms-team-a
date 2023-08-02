import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { CreateLecture } from "@/app/classroom/(components)/CreateLecture";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const createLecture = async (lecture: CreateLecture) => {
  let videoUrl = "";

  if (lecture.lectureType === "비디오") {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      "lectures/videos/" + lecture.lectureContent.video[0].name,
    );
    await uploadBytes(storageRef, lecture.lectureContent.video[0]);
    videoUrl = await getDownloadURL(
      ref(storage, "lectures/videos/" + lecture.lectureContent.video[0].name),
    );
  }

  const lectureData = {
    ...lecture,
    user: doc(db, "courses", lecture.courseId),
    course: doc(db, "users", lecture.userId),
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
