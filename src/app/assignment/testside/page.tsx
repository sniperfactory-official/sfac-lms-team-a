"use client";
import React from "react";
import AssignmentSidebar from "@/app/assignment/(components)/AssignmentSidebar";
import AssignmentListBox from "@/app/assignment/(components)/(assignmentlist)/AssignmentListBox";
import { useGetAssignments } from "@/hooks/reactQuery/assignment/useGetAssignments";

const page = () => {
  const { data, error, isLoading } = useGetAssignments();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex mx-auto justify-center gap-x-[20px]">
      <AssignmentSidebar list={data ?? []} />
      <AssignmentListBox list={data ?? []} />
      {/* data없으면 엠티박스처리필요 */}
    </div>
  );
};

export default page;
