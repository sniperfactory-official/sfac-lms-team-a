"use client";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import LectureItem from "./LectureItem";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";

const LectureList = ({ courseData, isCourseId }: any) => {
  // props로 courseid 를 받아오게 만들기
  const { data: courseId } = useGetLectureListQuery(isCourseId); // course id를 넘겨주기

  // courseData의 id가 courseId과 일치하는 title 뽑기
  let courseTitle = courseData.find(
    (courseItem: CourseProps) => isCourseId === courseItem.id,
  )?.title;

  if (!courseId) {
    return <div>로 딩 중...</div>;
  } else if (courseId) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-bold">{courseTitle}</h2>
        <span className="  text-slate-500">강의 {courseId.length}개</span>
        {courseId.map((item: any) => (
          <LectureItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
};
export default LectureList;
