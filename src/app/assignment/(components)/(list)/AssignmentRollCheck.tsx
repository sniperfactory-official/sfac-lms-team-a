"use client";
import React, { useEffect, useState } from "react";
import AssignmentSidebar from "./AssignmentSidebar";
import AssignmentListBox from "./AssignmentListBox";
import { useGetAssignments } from "@/hooks/reactQuery/useGetAssignments";
import { useAppSelector } from "@/redux/store";
import AssignmentEmptyBox from "../AssignmentEmptyBox";
import { Assignment } from "@/types/firebase.types";
// import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";

const AssignmentRollCheck = () => {
  const userId = useAppSelector(state => state.userId.uid);
  // const {
  //   data: userData,
  //   isLoading: userLoading,
  //   isError: userError,
  //   error: userFetchError,
  // } = fetchUserInfo(userId);
  // console.log(userData);

  const { data, error, isLoading } = useGetAssignments();
  const [testData, setTestData] = useState<Assignment[]>([]);
  const getUpdateList = (arr: Assignment[]) => {
    console.log(arr);
    setTestData(arr);
  };
  console.log(data);
  useEffect(() => {
    if (data) {
      setTestData(data);
    }
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex mx-auto justify-center gap-x-[20px]">
      {data && <AssignmentSidebar list={data} getUpdateList={getUpdateList} />}
      {testData && testData.length > 0 ? (
        <AssignmentListBox list={testData} />
      ) : (
        <AssignmentEmptyBox EmptyText="과제가 아직 존재하지 않습니다!" />
      )}
      {/* <AssignmentListBox list={data} /> */}
      {/* <AssignmentListBox list={dummy} /> */}
    </div>
  );
};

export default AssignmentRollCheck;
