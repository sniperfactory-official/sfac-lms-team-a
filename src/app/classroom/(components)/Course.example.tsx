"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Course, Lecture } from "@/types/firebase.types";

interface ClassRoomLecture {
  id: Lecture["id"];
  title: Lecture["title"];
  order: number; // Lecture["order"]
  checked: boolean;
}

interface ClassRoomCourse {
  id: Course["id"];
  title: Course["title"];
  order: number; // Course["order"]
  lectures: ClassRoomLecture[];
  checked: boolean;
}

// Sidebar 컴포넌트에 전달되어야 하는 데이터의 예시이며, 추후 Props로 전달받아서 사용해주세요!
const courseDummy: ClassRoomCourse = {
  id: "1",
  title: "[DAY1] IT 기본",
  order: 1,
  lectures: [
    { id: "0", title: "ListTile 커스텀 위젯 만들기", order: 1, checked: false },
    { id: "1", title: "HTTP 리퀘스트 보내기", order: 2, checked: true },
    { id: "2", title: "ListTile 커스텀 위젯 만들기", order: 3, checked: false },
  ],
  checked: false,
};

// TODO: 상위 컴포넌트에서 전달이 필요할 것으로 예상되는 props를 정리해두었으며, 상황에 맞게 수정하신 후 사용해주세요!
interface ClassRoomCourseProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  course: ClassRoomCourse;
}

const ClassroomCourse = () => {
  const [isEdit, setIsEdit] = useState(false); // TODO: 상위 컴포넌트에서 props로 전달받아야 합니다.
  const [course, setCourse] = useState(courseDummy); // TODO: 데이터는 상위 컴포넌트에서 props로 전달받아야 합니다.
  const [isAllLecturesChecked, setIsAllLecturesChecked] = useState(false);

  const checkIsAllLecturesChecked = (lectures: ClassRoomLecture[]) => {
    return lectures.every(
      (courseItem: ClassRoomLecture) => courseItem.checked === true,
    );
  };

  const lectureCheckHandler = (id: string) => {
    const lectureIdx = course.lectures.findIndex(lecture => lecture.id === id);
    const prevLectureItem = course.lectures[lectureIdx];
    const newLectureItem = {
      ...prevLectureItem,
      checked: !prevLectureItem.checked,
    };
    const newCourse = {
      ...course,
      lectures: [
        ...course.lectures.filter(lecture => lecture.id !== id),
        newLectureItem,
      ].sort((a, b) => a.order - b.order),
    };

    setCourse(newCourse);
  };

  const courseCheckHandler = () => {
    setIsAllLecturesChecked(!isAllLecturesChecked);

    const newCourse = {
      ...course,
      lectures: course.lectures.map(lecture => ({
        ...lecture,
        checked: !isAllLecturesChecked,
      })),
    };

    setCourse(newCourse);
  };

  useEffect(() => {
    setIsAllLecturesChecked(checkIsAllLecturesChecked(course.lectures));
  }, [course.lectures]);

  return (
    <Sidebar
      courseId={course.id}
      header={course.title}
      contents={course.lectures}
      isEdit={isEdit}
      isCourseChecked={isAllLecturesChecked}
      lectureCheckHandler={lectureCheckHandler}
      courseCheckHandler={courseCheckHandler}
    />
  );
};

export default ClassroomCourse;
