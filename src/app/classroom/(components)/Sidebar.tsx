"use client";

import React, { useState } from "react";
import Sidebar, { List } from "@/components/Sidebar";
import ClassroomButton from "./Button";

const ClassroomSidebar = () => {
  const [sectionList, setSectionList] = useState<List[]>([]);

  const handleButtonClick = () => {
    const newSection = {
      title: `섹션 ${sectionList.length + 1}`,
      subList: ["① 프론트엔드와 백엔드", "② 프론트엔드와 백엔드"],
    };
    setSectionList(prevList => [...prevList, newSection]);
  };

  return (
    <Sidebar list={sectionList} onClick={() => console.log("click")}>
      <ClassroomButton onClick={handleButtonClick}>섹션 추가</ClassroomButton>
    </Sidebar>
  );
};

export default ClassroomSidebar;
