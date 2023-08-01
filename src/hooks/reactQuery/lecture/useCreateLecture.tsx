import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { CreateLecture } from "@/app/classroom/(components)/CreateLecture";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const createLecture = async (lecture: CreateLecture) => {
  const courseDocSnap = await getDoc(doc(db, "courses", lecture.courseId));
  const userDocSnap = await getDoc(doc(db, "users", lecture.userId));
  console.log(courseDocSnap, userDocSnap);
  // const docRef = await addDoc(collection(db, `lecture`), { ...lecture });
  // const storage = getStorage();
  // const storageRef = ref(storage, 'lectures/videos');
  // uploadBytes(storageRef, lecture.lectureContent.videoUrl);
  URL.createObjectURL;
  // console.log(docRef);
};

const useCreateLecture = (lecture: CreateLecture) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading, isSuccess } = useMutation<
    void,
    Error,
    CreateLecture
  >(() => createLecture(lecture), {
    onSuccess: data => {
      queryClient.invalidateQueries(["lecture"]);
    },
    onError: error => {
      console.log(error);
    },
  });

  return { mutate, isError, isLoading, isSuccess };
};

export default useCreateLecture;
