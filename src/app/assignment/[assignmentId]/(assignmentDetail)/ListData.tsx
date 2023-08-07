"use client";

import { useGetAssignments } from "@/hooks/reactQuery/useGetAssignments";
import AssignmentSidebar from "@/app/assignment/(components)/(list)/AssignmentSidebar";
import React from "react";

const ListData = () => {
  const {
    data: listData,
    error: listError,
    isLoading: listIsLoading,
  } = useGetAssignments();
  const getUpdateList = (arr: any[]) => {};
  if (listIsLoading) return <div>Loading...</div>;
  return (
    <>
      {listData && (
        <AssignmentSidebar list={listData} getUpdateList={getUpdateList} />
      )}
    </>
  );
};

export default ListData;
