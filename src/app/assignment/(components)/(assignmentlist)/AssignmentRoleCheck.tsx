"use client";
import React from "react";
import AssignmentSidebar from "@/app/assignment/(components)/AssignmentSidebar";
import AssignmentListBox from "@/app/assignment/(components)/(assignmentlist)/AssignmentListBox";
import { useGetAssignments } from "@/hooks/reactQuery/assignment/useGetAssignments";
import { usePathname } from "next/navigation";
import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { useAppSelector } from "@/redux/store";

const AssignmentRoleCheck = () => {
  const { data, error, isLoading } = useGetAssignments();
  const pathname = usePathname();
  const userId = useAppSelector(state => state.userInfo.id);
  const { data: userData } = fetchUserInfo(userId);

  if (isLoading) return <div>Loading...</div>;
  // 유저정보 값가져와서 롤분기처리필요
  // 에러핸들링필요
  return (
    <div className="flex justify-center gap-x-[20px]">
      <AssignmentSidebar list={data ?? []} userId={userId} />

      {pathname === "/assignment" && <AssignmentListBox list={data ?? []} />}
      {/* data없으면 엠티박스처리필요 */}
    </div>
  );
};

export default AssignmentRoleCheck;
