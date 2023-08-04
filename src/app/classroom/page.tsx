"use client";

import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetAllLectureListQuery from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import ClassroomSidebar from "./(components)/ClassroomSidebar";

const ClassroomPage = () => {
  // 모든 강의 섹션 정보(course 컬렉션) 가져오기
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesInfoQuery();

  // 모든 강의 목록 가져오기
  const { data: allLecturesData } = useGetAllLectureListQuery();
  console.log("allLecturesData:: ", allLecturesData);

  if (courseLoading) {
    return <div>로 딩 중...</div>;
  }

  return (
    <div>
      {allLecturesData && courseData && (
        <ClassroomSidebar
          courseData={courseData}
          allLecturesData={allLecturesData}
        />
      )}
    </div>
  );
};

export default ClassroomPage;
