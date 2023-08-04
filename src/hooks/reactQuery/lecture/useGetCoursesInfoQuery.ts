import { useQuery } from "@tanstack/react-query"; // 비동기 데이터를 관리하기 위해 사용한다.
import { db } from "@utils/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export interface CourseProps {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  order: number;
}

// 코스의 정보 가져오기. title 하고 id 값
const getCourseInfoData = async () => {
  const q = query(collection(db, "courses"), orderBy("order", "asc"));
  const qSnapshot = await getDocs(q);

  const courseDataList = qSnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title as string,
    createdAt: doc.data().createdAt as Timestamp,
    updatedAt: doc.data().updatedAt as Timestamp,
    order: doc.data().order as number,
  }));

  return courseDataList;
};

const useGetCoursesInfoQuery = () => {
  return useQuery<CourseProps[]>(
    ["courses"],
    async () => await getCourseInfoData(),
    {
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetCoursesInfoQuery;
