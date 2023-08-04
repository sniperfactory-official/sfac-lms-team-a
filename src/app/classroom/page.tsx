"use client";

import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetAllLectureListQuery from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import ClassroomSidebar from "./(components)/ClassroomSidebar";
import LectureList from "./(components)/LectureList";
import { useState } from "react";

const ClassroomPage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(""); // 클릭한 섹션 id

  // 모든 강의 섹션 정보(course 컬렉션) 가져오기
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesInfoQuery();

  // 모든 강의 목록 가져오기
  const { data: allLecturesData } = useGetAllLectureListQuery();

  console.log("selectedCourseId:::", selectedCourseId);

  if (courseLoading) {
    return <div>로 딩 중...</div>;
  }

  const onClickedCourse = (courseData: string) => {
    console.log("courseData", courseData);
    setSelectedCourseId(courseData);
  };

  return (
    <div>
      {allLecturesData && courseData && (
        <div className="flex">
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

export default ClassroomPage;
