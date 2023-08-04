"use client";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import LectureItem from "./LectureItem";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CreateLecture from "./CreateLecture";
import { useEffect } from "react";
import { initPlayLecture } from "@/redux/lectureSlice";

const LectureList = ({ courseData, isCourseId }: any) => {
  // props로 courseid 를 받아오게 만들기
  const { data: lectures, isLoading } = useGetLectureListQuery(isCourseId); // course id를 넘겨주기
  const user = useSelector((store: RootState) => store.userId);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading && lectures !== undefined) {
      if (lectures !== undefined) {
        const sortedLectures = [...lectures].sort((a, b) => {
          return a.order - b.order;
        });
        dispatch(
          initPlayLecture({
            lectures: sortedLectures,
            maxOrder: sortedLectures.length - 1,
          }),
        );
      }
    }
  }, [lectures]);
  
  // courseData의 id가 courseId과 일치하는 title 뽑기
  let courseTitle = courseData.find(
    (courseItem: CourseProps) => isCourseId === courseItem.id,
  )?.title;
  console.log("현재 선택된 코스", isCourseId);
  if (isLoading) {
    return <div>로 딩 중...</div>;
  } else if (lectures) {
    return (
      <div className="flex w-full h-full flex-col gap-5">
        <div className="flex w-full justify-between">
          <h2 className="text-lg font-bold">{courseTitle}</h2>
          {user !== undefined && (
            <CreateLecture userId={user.uid} courseId={isCourseId} />
          )}
        </div>
        <span className="  text-slate-500">강의 {lectures.length}개</span>
        {lectures.map((item: any,index:number) => (
          <LectureItem key={item.id} item={item} index={index} />
        ))}
      </div>
    );
  }
};
export default LectureList;
