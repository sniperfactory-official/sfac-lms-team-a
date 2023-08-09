import { LectureInfo } from "@/app/classroom/(components)/CreateLecture";
import { db } from "@/utils/firebase";
import getFileNameFromURL from "@/utils/getFileNameFromURL";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { getMetadata, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const getLectureInfo = async (lectureId: string) => {
  const lectureRef = doc(db, "lectures", lectureId);
  const lectureSnap = await getDoc(lectureRef);

  if (lectureSnap.exists()) {
    const data = lectureSnap.data();
    let video = [];
    if (data.lectureType === "비디오") {
      const extractedFileName = getFileNameFromURL(
        data.lectureContent.videoUrl,
      );
      const storage = getStorage();
      const fileRef = ref(storage, extractedFileName);
      const metaData = await getMetadata(fileRef);

      video.push(new File([], metaData.name));
    }
    const lecture = <LectureInfo>{
      title: data.title,
      isPrivate: data.isPrivate,
      startDate: data.startDate,
      endDate: data.endDate,
      createdAt: data.createdAt,
      updatedAt: Timestamp.now(),
      order: data.order,
      lectureType: data.lectureType,
      lectureContent: {
        ...data.lectureContent,
        video: video,
      },
    };
    return lecture;
  } else {
    console.log("No such Document!");
  }
};

const useGetLectureInfo = (lectureId: string) => {
  const [lectureInfo, setLectureInfo] = useState<LectureInfo>();

  useEffect(() => {
    (async function fetchData() {
      setLectureInfo(await getLectureInfo(lectureId));
    })();
  }, [lectureId]);

  return lectureInfo;
};

export default useGetLectureInfo;
