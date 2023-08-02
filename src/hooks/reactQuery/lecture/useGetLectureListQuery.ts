import { useQuery } from "@tanstack/react-query";
import { db } from "@utils/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// lectures 컬렉션의 coureseId와 courses의 id랑 일치하면, 문서들을 불러오게해줌
const getLecturesData = async (courseId: string) => {
  const q = query(
    collection(db, "lectures"),
    where("courseId", "==", doc(db, "courses", courseId)),
  );

  const courses: DocumentData[] = []; // course는 배열로 받아오기
  await getDocs(q).then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const courseData = doc.data(); // lectures 컬렉션의 문서 목록 객체
      courses.push(courseData);
    });
  });
  // console.log("courses 배열 안에 담긴 lectures 컬렉션: ", courses);
  return courses;
};

// 강의 리스트를 배열로 불러오는 커스텀훅
const useGetLectureListQuery = (courseId: string) => {
  // 'lecture'는 쿼리키. lectures의 courseId는 course의 id 값을 참조한다.
  // courseId는 동적으로 변하는 값으로, courseId 값에 따라
  console.log("동적으로 변하는 코스아이디: ", courseId);
  return useQuery(
    ["lecture", courseId],
    async () => await getLecturesData(courseId),

    { refetchOnWindowFocus: false },
  );
};

export default useGetLectureListQuery;
