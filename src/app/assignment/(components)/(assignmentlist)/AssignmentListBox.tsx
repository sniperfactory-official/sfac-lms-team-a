import React from "react";
import Card from "@/app/assignment/(components)/Card";
import AssignmentCard from "@/app/assignment/(components)/(assignmentlist)/AssignmentCard";
import { Assignment } from "@/types/firebase.types";

interface AssignmentListBoxProps {
  list: Assignment[];
}
const AssignmentListBox = ({ list }: AssignmentListBoxProps) => {
  return (
    <ul className="w-[775px] flex flex-col space-y-[20px]">
      {list?.map(item => {
        return (
          <Card key={item.id} vertical={false}>
            <AssignmentCard data={item} />
          </Card>
        );
      })}
    </ul>
  );
};

export default AssignmentListBox;
