"use client";
import React from "react";
import AssignmentSidebar from "@/app/assignment/(components)/AssignmentSidebar";
import AssignmentListBox from "@/app/assignment/(components)/(assignmentlist)/AssignmentListBox";
import { useGetAssignments } from "@/hooks/reactQuery/assignment/useGetAssignments";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { useGetCurrentStudentSubmittedAssignments } from "@/hooks/reactQuery/assignment/useGetCurrentStudentSubmittedAssignments";

const AssignmentRoleCheck = () => {
  const pathname = usePathname();
  const userInfo = useAppSelector(state => state.userInfo);
  const {
    data: assignments,
    isLoading: isAssignmentsLoading,
    // error: assignmentsError,
  } = useGetAssignments();
  const {
    data: submittedAssignments,
    isLoading: isSubmittedAssignmentsLoading,
    // error: submittedAssignmentsError,
  } = useGetCurrentStudentSubmittedAssignments(userInfo.id, userInfo.role);

  if (isAssignmentsLoading && isSubmittedAssignmentsLoading)
    return <div>Loading...</div>;
  // 에러핸들링필요
  return (
    <div className="flex justify-center gap-x-[20px]">
      <AssignmentSidebar
        list={assignments ?? []}
        userId={userInfo.id}
        role={userInfo.role}
      />

      {pathname === "/assignment" && (
        <AssignmentListBox
          list={assignments ?? []}
          role={userInfo.role}
          submittedList={submittedAssignments ?? []}
        />
      )}
    </div>
  );
};

export default AssignmentRoleCheck;
