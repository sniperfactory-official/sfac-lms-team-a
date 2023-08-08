"use client";

import React, { useState, useEffect } from "react";
import Category from "./Category";
import { useAppSelector } from "@/redux/store";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetLectureComments from "@/hooks/reactQuery/mypage/useGetLectureComments";
import LoadingSpinner from "@/components/Loading/Loading";
import useGetAssignments from "@/hooks/reactQuery/mypage/useGetAssignments";
import ModalWrapper from "@/components/ModalWrapper";
import CommunityModal from "@/components/CommunityModal";

export default function UserActivityList() {
  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleAssignmentsModalClick = () => {
    setIsAssignmentsModalOpen(!isAssignmentsModalOpen);
  };
  const handlePostModalClick = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };
  const handleCommentsModalClick = () => {
    setIsCommentsModalOpen(!isCommentsModalOpen);
  };

  const handleDetailModalClick = () => {
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const userId = useAppSelector(state => state.userInfo.id);
  const {
    data: assignmentData,
    isLoading: assignmentLoading,
    isError: assignmentError,
    error: assignmentFetchError,
  } = useGetAssignments(userId);
  console.log("assignmentData::: ", assignmentData);

  const {
    data: myPostData,
    isLoading: myPostLoading,
    isError: myPostError,
    error: myPostFetchError,
  } = useGetMyPosts(userId);
  console.log("useGetMyPosts::myPostData::", myPostData);

  const {
    data: lectureCommentData,
    isLoading: lectureCommentLoading,
    isError: lectureCommentError,
    error: lectureCommentFetchError,
  } = useGetLectureComments(userId);

  console.log("lectureCommentData::: ", lectureCommentData);

  // 내가 제출한 과제
  const filteredAssignments = assignmentData?.map(assignment => ({
    id: assignment.id,
    title: assignment.AssignmentData?.title,
    content: assignment.attachmentFiles.url
      ? `첨부파일${assignment.attachmentFiles.length}`
      : assignment.links,
    category: assignment.AssignmentData?.level,
    createdAt: assignment.createdAt,
  }));

  // console.log("filteredAssignments ::", filteredAssignments);

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
  // console.log("filteredPosts", filteredPosts);

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
  // console.log("filteredComments", filteredComments);

  // 내가 쓴 강의 댓글
  const filteredLectureComments = lectureCommentData?.map(comment => ({
    id: comment.id,
    title: comment.parentData.title,
    content: comment.content,
    category: "강의실",
    createdAt: comment.createdAt,
  }));

  // console.log("filteredLectureComments", filteredLectureComments);

  const comments = [
    ...(filteredComments || []),
    ...(filteredLectureComments || []),
  ];

  if (lectureCommentLoading || myPostLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex gap-4 mt-10">
        <Category
          title="제출한 과제"
          targetData={filteredAssignments}
          handleClick={handleAssignmentsModalClick}
        />
        {isAssignmentsModalOpen && (
          <ModalWrapper
            onCloseModal={() =>
              setIsAssignmentsModalOpen(!isAssignmentsModalOpen)
            }
            width="748px"
            modalTitle="제출한 과제"
            children={
              <Category
                title=""
                targetData={filteredAssignments}
                handleClick={handleAssignmentsModalClick}
              />
            }
          />
        )}
        <Category
          title="나의 게시글"
          targetData={filteredPosts}
          handleClick={handlePostModalClick}
        />
        {isPostModalOpen && (
          <ModalWrapper
            onCloseModal={() => setIsPostModalOpen(!isPostModalOpen)}
            width="748px"
            modalTitle="나의 게시글"
            children={
              <Category
                title=""
                targetData={filteredPosts}
                handleClick={handlePostModalClick}
              />
            }
          />
        )}
        <Category
          title="나의 댓글"
          targetData={comments}
          handleClick={handleCommentsModalClick}
        />
        {isCommentsModalOpen && (
          <ModalWrapper
            onCloseModal={() => setIsCommentsModalOpen(!isCommentsModalOpen)}
            width="748px"
            modalTitle="나의 댓글"
            children={
              <Category
                title=""
                targetData={comments}
                handleClick={handleCommentsModalClick}
              />
            }
          />
        )}

        {isDetailModalOpen && (
          <ModalWrapper
            onCloseModal={() => setIsDetailModalOpen(!isDetailModalOpen)}
            width="748px"
            children={<CommunityModal />}
          />
        )}
      </div>
    </>
  );
}
