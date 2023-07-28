import { useQuery } from "@tanstack/react-query"; // 비동기 데이터를 관리하기 위해 사용한다.
import { db } from "@utils/firebase";
import {
  DocumentData,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// 코스의 정보 가져오기. title 하고 id 값
const getCourseInfoData = async () => {
  const q = await getDocs(collection(db, "courses"));

  const courseInfoDataList = q.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title as string,
    createdAt: doc.data().createdAt as Timestamp,
    updatedAt: doc.data().updatedAt as Timestamp,
  }));

  return courseInfoDataList;
};

const useGetCoursesInfoQuery = () => {
  return useQuery(["courses"], async () => await getCourseInfoData(), {
    refetchOnWindowFocus: false,
  });
};

export default useGetCoursesInfoQuery;
