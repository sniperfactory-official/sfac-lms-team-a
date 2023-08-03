"use client";

// 각각의 강의 섹션 컴포넌트
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Lecture } from "@/types/firebase.types";

const CourseSection = ({ courseData, allLecturesData, isEdit }: any) => {
  const [checkedLectureIds, setCheckedLectureIds] = useState<string[]>([]); // 체크된 각 강의 항목의 id를 담은 배열
  const [courseChecked, setCourseChecked] = useState<boolean>(false); // 코스 섹션에서의 체크 여부 상태

  // 강의 리스트 체크박스의 체크 상태만 관리한다.
  const onLectureCheck = (lectureId: string) => {
    const currentCheckLectureIds = checkedLectureIds.includes(lectureId)
      ? checkedLectureIds.filter(id => id !== lectureId)
      : [...checkedLectureIds, lectureId];

    setCheckedLectureIds(currentCheckLectureIds);

    // 모든 강의 항목이 체크 됐는가의 여부
    const isAllLecturesChecked = allLecturesData.every((lecture: Lecture) => {
      return currentCheckLectureIds.includes(lecture.id);
    });

    // 모든 강의 항목이 체크 되었다면, 코스 섹션도 true로. 그렇지 않다면 false
    if (isAllLecturesChecked) {
      setCourseChecked(true);
    } else {
      setCourseChecked(false);
    }
  };

  // onCourseCheck 클릭 시, course의 체크 상태 값이 바뀜에 따라서 lecture들도 바뀐다.
  const onCourseCheck = () => {
    const toggleCourseChecked = !courseChecked; // true로 변환

    setCourseChecked(toggleCourseChecked);

    // 코스 섹션을 체크했을 때, 그 값이 true면 모든 강의 항목의 Id를 배열에 담는다.
    if (toggleCourseChecked) {
      setCheckedLectureIds(
        allLecturesData.map((lecture: Lecture) => lecture.id),
      );
    } else {
      setCheckedLectureIds([]); // 코스 섹션을 체크 시, false면 빈 배열로 만든다.
    }
  };

  return (
    <>
      <div>
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
          isCourseChecked={courseChecked} // 강의 중 하나라도 체크가 해제될 시, 섹션도 체크 해제 됨(코스의 체크 여부)
          courseCheckHandler={onCourseCheck} // 코스 섹션 체크 토글
        />
      </div>
    </>
  );
};

export default CourseSection;
