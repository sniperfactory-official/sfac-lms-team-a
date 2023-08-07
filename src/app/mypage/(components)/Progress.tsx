"use client";
import Image from "next/image";
import React from "react";
import arrow from "/public/images/Arrow.svg";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import { useAppSelector } from "@/redux/store";

export default function Progress() {
  const userId = useAppSelector(state => state.userInfo.id);
  const arr = [1, 2, 3];

  const {
    data: progressData,
    isLoading: progressLoading,
    isError: progressError,
    error: progressFetchError,
  } = useGetProgressInfoQuery(userId);

  let percentage = 0;
  if (progressData && progressData.completedLectures && progressData.total) {
    percentage = Math.round(
      (progressData.completedLectures / progressData.total) * 100,
    );
  }

  return (
    <>
      <h3 className="text-lg font-bold mb-[19px] ">강의 수강률</h3>
      <div className="w-full h-[30px] bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-[30px] bg-primary-50 rounded-full text-center text-blue-100 "
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </>
  );
}
