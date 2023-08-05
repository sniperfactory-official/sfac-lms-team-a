"use client";
import LectureItem from "./LectureItem";
import { Course, Lecture } from "@/types/firebase.types";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";

// 강의 리스트 목록
const LectureList = ({ isCourseId }: { isCourseId: string }) => {
  // props로 courseid 를 받아오게 만들기
  const { data } = useGetLectureListQuery(isCourseId); // course id를 넘겨주기

  if (!data) {
    return <div>Loading...</div>;
  } else if (data) {
    return (
      <div className="flex flex-col gap-5">
        {data.map((item: any) => (
          <LectureItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
};
export default LectureList;
