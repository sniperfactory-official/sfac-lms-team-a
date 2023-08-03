"use client";

import React, { useState } from "react";
import CourseSection from "./CourseSection";
import { LectureProps } from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import Button from "@/app/classroom/(components)/Button";
import EditButton from "@/components/common/Button";

interface ClassroomSidebarProps {
  courseData: CourseProps[];
  allLecturesData: { [key: string]: LectureProps[] };
}

const ClassroomSidebar = ({
  courseData,
  allLecturesData,
}: ClassroomSidebarProps) => {
  // 섹션 수정 버튼 상태
  const [isEdit, setIsEdit] = useState(false);

  // 섹션 수정 버튼 토글
  const editButtonHandler = () => {
    setIsEdit(!isEdit);
  };

  console.log("courseData:::: ", courseData);
  console.log("allLecturesData:::: ", allLecturesData);

  return (
    <>
      {courseData.map((courseItem: CourseProps) => (
        <CourseSection
          key={courseItem.id}
          courseData={courseItem}
          allLecturesData={allLecturesData[courseItem.id] || []}
          isEdit={isEdit}
        />
      ))}

      <div>
        <Button onClick={() => {}}>섹션 추가</Button>

        {courseData?.length === 0 ? (
          <></>
        ) : (
          <>
            <Button onClick={editButtonHandler}>섹션 수정</Button>
            {isEdit ? (
              <div className="flex">
                <EditButton text="수정 완료" isError={false} disabled={false} />
                <EditButton text="강의 삭제" isError={true} disabled={false} />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClassroomSidebar;
