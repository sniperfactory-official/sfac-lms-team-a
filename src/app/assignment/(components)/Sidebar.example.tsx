import Sidebar, { Content } from "@/components/Sidebar";
import React from "react";

// Sidebar 컴포넌트에 전달되어야 하는 데이터 예시입니다.
const assignmentDummy = [
  { id: "1", title: "LisTile 커스텀 위젯 만들기", order: 1 },
  { id: "2", title: "HTTP 리퀘스트 만들기", order: 2 },
  { id: "3", title: "LisTile 커스텀 위젯 만들기", order: 3 },
];

// 상위 컴포넌트에서 전달이 필요할 것으로 예상되는 props를 예시로 설정하였으며, 상황에 맞게 수정하신 후 사용해주세요!
interface AssignmentSidebarProps {
  course: Content[];
}

const AssignmentSidebar = () => {
  return (
    <aside>
      <Sidebar header="전체 과제" contents={assignmentDummy} />
      {/* 이 곳에 button 등 필요한 요소를 넣어서 사용하시면 됩니다. */}
    </aside>
  );
};

export default AssignmentSidebar;
