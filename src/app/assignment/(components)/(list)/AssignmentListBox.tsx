import React from "react";
import Card from "@/app/assignment/(components)/Card";
import AssignmentCard from "@/app/assignment/(components)/(list)/AssignmentCard";

interface AssignmentListBoxProps {
  list?: any[];
}
const AssignmentListBox = ({ list }: AssignmentListBoxProps) => {
  return (
    <ul className="w-[775px] flex flex-col space-y-[20px]">
      {list?.map((item: any, idx: number) => {
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
