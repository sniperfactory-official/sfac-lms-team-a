import { LectureInfo } from "@/app/classroom/(components)/CreateLecture";
import deleteFileFromStorage from "@/utils/deleteFileFromStorage";
import { db } from "@/utils/firebase";
import getFileNameFromURL from "@/utils/getFileNameFromURL";
import uploadFileToStorage from "@/utils/uploadFileToStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";

interface UpdateLectureProps {
  lecture: LectureInfo;
  lectureId: string;
}

const updateLecture = async ({ lecture, lectureId }: UpdateLectureProps) => {
  let videoUrl = lecture.lectureContent.videoUrl;
  if (
    lecture.lectureType === "비디오" &&
    lecture.lectureContent.video[0].size !== 0
  ) {
    videoUrl = await uploadFileToStorage(
      "lectures/videos/",
      lecture.lectureContent.video[0],
    );
    if (videoUrl !== lecture.lectureContent.videoUrl) {
      const extractedFileName = getFileNameFromURL(
        lecture.lectureContent.videoUrl,
      );
      const response = await deleteFileFromStorage(extractedFileName);
      console.log(response);
    }
  }

  const lectureData = {
    ...lecture,
    lectureContent: {
      images: lecture.lectureContent.images,
      textContent: lecture.lectureContent.textContent,
      externalLink: lecture.lectureContent.externalLink,
      videoUrl,
      videoLength: lecture.lectureContent.videoLength,
    },
  };

  const lectureRef = doc(db, "lectures", lectureId);
  const updateLectureInfo = await updateDoc(lectureRef, lectureData);
  console.log(updateLectureInfo);
};

const useUpdateLecture = (modalHandler: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(updateLecture, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lecture"]);
      modalHandler();
    },
    onError: error => {
      console.log(error);
    },
  });
};

export default useUpdateLecture;
