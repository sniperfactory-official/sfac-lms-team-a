"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import useUpdateLectureOrder from "@/hooks/reactQuery/lecture/useUpdateLectureOrder";
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
  const [lectureListItem, setLectureListItem] = useState([]);

  // 강의 순서를 변경하는 뮤테이션 훅
  const { mutateAsync: updateMutate } = useUpdateLectureOrder();

  useEffect(() => {
    const result = courseChecked.includes(courseData.id); // true, false
    const updateLectureList = allLecturesData.map((lecture: Lecture) => {
      return {
        id: lecture.id,
        title: lecture.title,
        checked: checkedLectureIds.includes(lecture.id),
      };
    });

    setIsChecked(result);
    setLectureListItem(updateLectureList);
  }, [courseChecked, courseData, allLecturesData, checkedLectureIds]);

  const onDragEndTest = (movedLectureItem: any) => {
    setLectureListItem(movedLectureItem);
    // 드래그 앤 드롭으로 변경된 순서를 Firebase에 저장한다.
    updateMutate(movedLectureItem);
    console.log("movedLectureItem!!: ", movedLectureItem);
  };

  console.log("lectureListItem::", lectureListItem);

  return (
    <button onClick={() => onClickedCourse(courseData.id)} className="mb-2">
      <Sidebar
        key={courseData.id}
        courseId={courseData.id}
        header={courseData.title}
        contents={lectureListItem}
        isEdit={isEdit}
        lectureCheckHandler={onLectureCheck} // 각 강의 항목 체크 여부
        isCourseChecked={isCheck} // 강의 중 하나라도 체크가 해제될 시, 섹션도 체크 해제 됨(코스의 체크 여부)
        courseCheckHandler={onCourseCheck} // 코스 섹션 체크 토글
        onDragEnd={onDragEndTest}
      />
    </button>
  );
};

export default CourseSection;
