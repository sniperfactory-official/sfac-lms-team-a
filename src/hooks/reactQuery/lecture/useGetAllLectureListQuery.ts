import { Lecture } from "@/types/firebase.types";
import { useQuery } from "@tanstack/react-query";
import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllLetureData = async () => {
  const q = await getDocs(collection(db, "lectures"));
  const lectureInfoDataList = q.docs.map(doc => doc.data());
  console.log("전체 강의 목록(lectureInfoDataList): ", lectureInfoDataList);

  const lecturesByCourseId: { [key: string]: Lecture[] } = {};
  console.log("lecturesByCourseId:::: ", lecturesByCourseId);
  lectureInfoDataList.forEach((lectureItem: any) => {
    const courseId = lectureItem.courseId.id; // course의 id에 접근
    if (!lecturesByCourseId[courseId]) {
      lecturesByCourseId[courseId] = [];
    }
    lecturesByCourseId[courseId].push(lectureItem);
  });

  console.log("course의 id를 key로 기준으로한 배열:: ", lecturesByCourseId);
  return lecturesByCourseId;
};

const useGetAllLectureListQuery = () => {
  return useQuery(["lectures"], async () => await getAllLetureData());
};

export default useGetAllLectureListQuery;
