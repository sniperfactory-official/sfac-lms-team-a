"use client";

import React from "react";
import Category from "./Category";
import { useAppSelector } from "@/redux/store";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetLectureComments from "@/hooks/reactQuery/mypage/useGetLectureComments";
import LoadingSpinner from "@/components/Loading/Loading";
import useGetAssignments from "@/hooks/reactQuery/mypage/useGetAssignments";

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

  const {
    data: assignmentData,
    isLoading: assignmentLoading,
    isError: assignmentError,
    error: assignmentFetchError,
  } = useGetAssignments(userId);
  console.log(assignmentData);

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



  // 내가 제출한 과제

  const filteredAssignments = assignmentData?.map(assignment => ({
    id: assignment.id,
    title: assignment.AssignmentData.title,
    content:  assignment.attachmentFiles.url? `첨부파일${assignment.attachmentFiles.length}` :assignment.links ,
    category: assignment.AssignmentData.level,
    createdAt: assignment.createdAt,
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
        <Category title="제출한 과제" targetData={filteredAssignments} />
        <Category title="나의 게시글" targetData={filteredPosts} />
        <Category title="나의 댓글" targetData={comments} />
      </div>
    </>
  );
}
