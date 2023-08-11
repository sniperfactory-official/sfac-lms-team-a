"use client";

import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetAllLectureListQuery from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import ClassroomSidebar from "./(components)/ClassroomSidebar";
import LectureList from "./(components)/LectureList";
import { useState } from "react";

const ClassRoomWrapper = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(""); // 클릭한 섹션 id
  const [isEdit, setIsEdit] = useState<boolean>(false); // 섹션 수정 버튼 상태

  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesInfoQuery();
  // 모든 강의 목록 가져오기
  const { data: allLecturesData } = useGetAllLectureListQuery();

  // order가 0이 코스 데이터 찾기
  const findeFirstCourseId =
    courseData?.find((courseItem: any) => courseItem.order === 0)?.id || "";

  const onClickedCourse = (courseData: string) => {
    setSelectedCourseId(courseData);
  };

  if (courseLoading) {
    return <div>로 딩 중...</div>;
  }

  return (
    <div className="w-full max-w-[1200px] flex justify-center ">
      {allLecturesData && courseData && (
        <div className="flex mr-auto w-full">
          <ClassroomSidebar
            courseData={courseData}
            allLecturesData={allLecturesData}
            onClickedCourse={onClickedCourse}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          {selectedCourseId ? (
            <LectureList
              courseData={courseData}
              allLecturesData={allLecturesData}
              isCourseId={selectedCourseId}
              onClickedCourse={onClickedCourse}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          ) : (
            // 섹션을 클릭하지 않은 경우 기본으로 띄워줄 강의
            <LectureList
              courseData={courseData}
              allLecturesData={allLecturesData}
              isCourseId={findeFirstCourseId}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ClassRoomWrapper;
