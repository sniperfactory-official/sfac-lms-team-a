import { Lecture, LectureContent } from "@/types/firebase.types";
import { useQuery } from "@tanstack/react-query";
import { db } from "@utils/firebase";
import {
  DocumentReference,
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export interface LectureProps {
  id: string;
  userId: DocumentReference;
  courseId: DocumentReference;
  title: string;
  isPrivate: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lectureContent: LectureContent;
  order: number;
}

const getAllLetureData = async () => {
  const q = query(collection(db, "lectures"), orderBy("order", "asc"));
  const qSnapshot = await getDocs(q);

  const lectureDataList = qSnapshot.docs.map(
    (doc): LectureProps => ({
      id: doc.id,
      courseId: doc.data().courseId as DocumentReference,
      title: doc.data().title as string,
      order: doc.data().order as number,
      isPrivate: doc.data().isPrivate as boolean,
      startDate: doc.data().startDate as Timestamp,
      endDate: doc.data().endDate as Timestamp,
      createdAt: doc.data().createdAt as Timestamp,
      updatedAt: doc.data().updatedAt as Timestamp,
      userId: doc.data().userId as DocumentReference,
      lectureContent: doc.data().lectureContent as LectureContent,
    }),
  );

  // course의 id를 key로 삼아 하위에 강의 리스트 배열이 담긴 형태
  const lecturesByCourseId: { [key: string]: LectureProps[] } = {};
  lectureDataList.forEach((lectureItem: any) => {
    const courseId = lectureItem.courseId.id; // lectureItem에 존재하는 course의 id
    if (!lecturesByCourseId[courseId]) {
      lecturesByCourseId[courseId] = [];
    }
    lecturesByCourseId[courseId].push(lectureItem);
  });

  return lecturesByCourseId;
};

const useGetAllLectureListQuery = () => {
  return useQuery(["lecture"], async () => await getAllLetureData());
};

export default useGetAllLectureListQuery;
