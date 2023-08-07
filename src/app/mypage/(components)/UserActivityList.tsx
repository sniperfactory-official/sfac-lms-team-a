"use client";

import React from "react";
import Category from "./Category";
import { useAppSelector } from "@/redux/store";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";

export default function UserActivityList() {
  const userId = useAppSelector(state => state.userInfo.id);
  const {
    data: myPostData,
    isLoading: myPostLoading,
    isError: myPostError,
    error: myPostFetchError,
  } = useGetMyPosts(userId);

  const {
    data: myAssignmentData,
    isLoading: myAssignmentLoading,
    isError: myAssignmentError,
    error: myAssignmentFetchError,
  } = useGetMyAssignments(userId);

  console.log("myPostData", myPostData);
  console.log("myAssignmentData", myAssignmentData);

  return (
    <>
      <div className="grid">
        <Category title="제출한 과제" targetData={myAssignmentData} />
        <Category title="나의 게시글" targetData={myPostData} />
        <Category title="나의 댓글" targetData={} />
      </div>
    </>
  );
}
