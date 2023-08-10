import React from "react";
import Card from "@/app/assignment/(components)/Card";
import AssignmentCard from "@/app/assignment/(components)/(assignmentlist)/AssignmentCard";
import { Assignment, User } from "@/types/firebase.types";

interface AssignmentListBoxProps {
  list: Assignment[];
  role: string;
  submittedList: string[];
}
const AssignmentListBox = ({
  list,
  role,
  submittedList,
}: AssignmentListBoxProps) => {
  return (
    <ul className="w-[775px] flex flex-col space-y-[20px]">
      {list?.map(item => {
        return (
          <Card key={item.id} vertical={false}>
            <AssignmentCard
              data={item}
              role={role}
              submittedList={submittedList}
            />
          </Card>
        );
      })}
      {/* 엠티박스처리필요 */}
    </ul>
  );
};

export default AssignmentListBox;
