"use client";

import React from "react";
import Category from "./Category";
import { useAppSelector } from "@/redux/store";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetLectureComments from "@/hooks/reactQuery/mypage/useGetLectureComments";
import LoadingSpinner from "@/components/Loading/Loading";

export default function UserActivityList() {
  const userId = useAppSelector(state => state.userInfo.id);
  const {
    data: myPostData,
    isLoading: myPostLoading,
    isError: myPostError,
    error: myPostFetchError,
  } = useGetMyPosts(userId);

  const {
    data: lectureCommentData,
    isLoading: lectureCommentLoading,
    isError: lectureCommentError,
    error: lectureCommentFetchError,
  } = useGetLectureComments(userId);

  // 내가 쓴 글
  const filteredPosts = myPostData
    ?.filter(el => !el.parentId)
    .map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      createdAt: post.createdAt,
    }));

  // 내가 쓴 댓글
  const filteredComments = myPostData
    ?.filter(el => el.parentId && el.parentData.title)
    .map(comment => ({
      id: comment.id,
      title: comment.parentData.title,
      content: comment.content,
      category: comment.parentData.category,
      createdAt: comment.createdAt,
    }));
  // 내가 쓴 강의 댓글

  const filteredLectureComments = lectureCommentData?.map(comment => ({
    id: comment.id,
    title: comment.parentData.title,
    content: comment.content,
    category: "강의실",
    createdAt: comment.createdAt,
  }));

  const comments = [
    ...(filteredComments || []),
    ...(filteredLectureComments || []),
  ];

  if (lectureCommentLoading || myPostLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="grid">
        {/* <Category title="제출한 과제" targetData={myAssignmentData} /> */}
        <Category title="나의 게시글" targetData={filteredPosts} />
        <Category title="나의 댓글" targetData={comments} />
      </div>
    </>
  );
}
