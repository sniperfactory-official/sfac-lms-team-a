import { Lecture } from "@/types/firebase.types";
import { useQuery } from "@tanstack/react-query";
import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllLetureData = async () => {
  const q = await getDocs(collection(db, "lectures"));
  const lectureInfoDataList = q.docs.map(doc => doc.data());
  return lectureInfoDataList;
};

const useGetAllLectureListQuery = (selectedCourseId: string) => {
  const { data: allLecturesData, isLoading: lectureLoading } = useQuery(
    ["lectures"],
    async () => await getAllLetureData(),
    {
      refetchOnWindowFocus: false,
    },
  );

  // course 컬렉션의 id 필드별로 배열로 묶기
  const lecturesByCourseId: { [key: string]: Lecture[] } = {};

  // lectureItem은 강의 목록들이다.
  allLecturesData?.forEach((lectureItem: any) => {
    const courseId = lectureItem.courseId.id; // I7YsTuxOWvT1M2lakkAM
    if (!lecturesByCourseId[courseId]) {
      lecturesByCourseId[courseId] = [];
    }
    lecturesByCourseId[courseId].push(lectureItem);

    // console.log("lecturesByCourseId[courseId]: ", lecturesByCourseId[courseId]); // 강의 목록이 잘 들어가있다.
    // console.log("코스별로묶은 lecturesByCourseId 객체: ", lecturesByCourseId); // 객체 안에 course id 별로 강의 리스트 넣어둠.
  });
  return { allLecturesData, lectureLoading, lecturesByCourseId };
};

export default useGetAllLectureListQuery;
