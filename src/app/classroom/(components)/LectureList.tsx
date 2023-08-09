"use client";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import LectureItem from "./LectureItem";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CreateLecture from "./CreateLecture";
import Image from "next/image";

const LectureList = ({ courseData, isCourseId }: any) => {
  // props로 courseid 를 받아오게 만들기
  const { data: lectures, isLoading } = useGetLectureListQuery(isCourseId); // course id를 넘겨주기
  const user = useSelector((store: RootState) => store.userInfo);

  // courseData의 id가 courseId과 일치하는 title 뽑기
  let courseTitle = courseData.find(
    (courseItem: CourseProps) => isCourseId === courseItem.id,
  )?.title;
  console.log("현재 선택된 코스", isCourseId);

  if (isLoading) {
    return <div>로 딩 중...</div>;
  } else if (lectures) {
    // user.role이 수강생일 경우, 비공개 강의인 것을 필터로 거르고, 관리자일 경우 모든 강의 보이게 처리
    const privateLectureFilter =
      user.role === "수강생"
        ? lectures.filter((lecture: any) => !lecture.isPrivate)
        : lectures;

    return (
      <div className="flex w-full h-full flex-col gap-5">
        <div className="flex w-full justify-between">
          <h2 className="text-lg font-bold">{courseTitle}</h2>
          {user !== undefined && (
            <CreateLecture userId={user.id} courseId={isCourseId} />
          )}
        </div>
        <span className="  text-slate-500">
          강의 {privateLectureFilter.length}개
        </span>

        {privateLectureFilter.length === 0 && (
          <div className="flex w-full justify-between ">
            <Image
              src="/images/noLectureItem.svg"
              alt="강의가 아직 존재하지 않습니다."
              width={400}
              height={400}
              className="mx-auto my-[90px]"
            />
          </div>
        )}
        {privateLectureFilter.map((item: any, index: number) => (
          <LectureItem key={item.id} item={item} index={index} />
        ))}
      </div>
    );
  }
};
export default LectureList;
