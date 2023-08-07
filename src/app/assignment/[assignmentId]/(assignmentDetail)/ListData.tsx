"use client";


import React from "react";
import AssignmentSidebar from "../../(components)/Sidebar.example";
import { useGetAssignments } from "@/hooks/reactQuery/assignment/useGetAssignments";

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
