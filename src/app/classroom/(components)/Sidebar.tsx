"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

const course = [
  { id: "0", title: "ListTile 커스텀 위젯 만들기" },
  { id: "1", title: "HTTP 리퀘스트 보내기" },
  { id: "2", title: "ListTile 커스텀 위젯 만들기" },
];

const ClassroomSidebar = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Sidebar header="전체 과제" contents={course} isEdit={isEdit}>
      <button onClick={() => setIsEdit(!isEdit)}>강의 수정</button>
    </Sidebar>
  );
};

export default ClassroomSidebar;
