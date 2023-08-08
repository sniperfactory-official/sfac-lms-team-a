"use client";

import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetAllLectureListQuery from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import ClassroomSidebar from "./(components)/ClassroomSidebar";
import LectureList from "./(components)/LectureList";
import { useState } from "react";

const ClassRoomWrapper = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(""); // 클릭한 섹션 id
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesInfoQuery();
  // 모든 강의 목록 가져오기
  const { data: allLecturesData } = useGetAllLectureListQuery();

  // console.log("selectedCourseId:::", selectedCourseId);

  if (courseLoading) {
    return <div>로 딩 중...</div>;
  }

  const onClickedCourse = (courseData: string) => {
    setSelectedCourseId(courseData);
  };

  return (
    <div className="w-full max-w-[1200px] flex justify-center ">
      {allLecturesData && courseData && (
        <div className="flex mr-auto w-full">
          <ClassroomSidebar
            courseData={courseData}
            allLecturesData={allLecturesData}
            onClickedCourse={onClickedCourse}
          />
          {selectedCourseId && (
            <LectureList
              courseData={courseData}
              allLecturesData={allLecturesData}
              isCourseId={selectedCourseId}
              onClickedCourse={onClickedCourse}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ClassRoomWrapper;
