"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Course } from "@/types/firebase.types";

type ClassroomSidebarProps = Pick<Course, "id" | "title">;

const course = [
  { id: "0", title: "ListTile 커스텀 위젯 만들기" },
  { id: "1", title: "HTTP 리퀘스트 보내기" },
  { id: "2", title: "ListTile 커스텀 위젯 만들기" },
];

const ClassroomSidebar = ({ id, title }: ClassroomSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isCourseChecked, setIsCourseChecked] = useState(false);

  const courseCheckHandler = () => {
    setIsCourseChecked(!isCourseChecked);
  };

  return (
    <Sidebar
      courseId={id}
      header={title}
      contents={course}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
      isCourseChecked={isCourseChecked}
      courseCheckHandler={courseCheckHandler}
    >
      <button onClick={() => setIsEdit(!isEdit)}>강의 수정</button>
    </Sidebar>
  );
};

export default ClassroomSidebar;
