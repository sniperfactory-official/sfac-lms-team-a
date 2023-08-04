"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Lecture } from "@/types/firebase.types";

const CourseSection = ({
  courseData,
  allLecturesData,
  isEdit,
  checkedLectureIds,
  courseChecked,
  onLectureCheck,
  onCourseCheck,
  onClickedCourse,
}: any) => {
  const [isCheck, setIsChecked] = useState(false);
  useEffect(() => {
    const result = courseChecked.includes(courseData.id);
    console.log("체크 결과", result);
    setIsChecked(result);
  }, [courseChecked, courseData]);

  return (
    <>
      <div onClick={() => onClickedCourse(courseData.id)}>
        <Sidebar
          key={courseData.id}
          courseId={courseData.id}
          header={courseData.title}
          contents={
            allLecturesData.map((lecture: Lecture) => {
              return {
                id: lecture.id,
                title: lecture.title,
                checked: checkedLectureIds.includes(lecture.id),
              };
            }) || []
          }
          isEdit={isEdit}
          lectureCheckHandler={onLectureCheck} // 각 강의 항목 체크 여부
          isCourseChecked={isCheck} // 강의 중 하나라도 체크가 해제될 시, 섹션도 체크 해제 됨(코스의 체크 여부)
          courseCheckHandler={onCourseCheck} // 코스 섹션 체크 토글
        />
      </div>
    </>
  );
};

export default CourseSection;
