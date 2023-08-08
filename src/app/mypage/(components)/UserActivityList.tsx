"use client";

import React, { useState, useEffect } from "react";
import Category from "./Category";
import { useAppSelector } from "@/redux/store";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetLectureComments from "@/hooks/reactQuery/mypage/useGetLectureComments";
import LoadingSpinner from "@/components/Loading/Loading";
import useGetAssignments from "@/hooks/reactQuery/mypage/useGetAssignments";
import ModalWrapper from "@/components/ModalWrapper";
import AssignmentsDetailModal from "./AssignmentsDetailModal";
import PostDetailModal from "./PostDetailModal";
import CommentsDetailModal from "./CommentsDetailModal";

export default function UserActivityList() {
  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isAssignmentsDetailModalOpen, setIsAssignmentsDetailModalOpen] =
    useState(false);
  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(false);
  const [isCommentsDetailModalOpen, setIsCommentsDetailModalOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState("");

   const handleAssignmentsModalClick = () => {
    setIsAssignmentsModalOpen(!isAssignmentsModalOpen);
  };
  const handlePostModalClick = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };
  const handleCommentsModalClick = () => {
    setIsCommentsModalOpen(!isCommentsModalOpen);
  };
  const handleAssignmentsDetailModalClick = (id: string) => {
    setIsAssignmentsModalOpen(!isAssignmentsModalOpen);
    setIsAssignmentsDetailModalOpen(true);
    setSelectedId(()=>id);
  };
  const handlePostDetailModalClick = (id: string) => {
    setIsPostModalOpen(!isPostModalOpen);
    setIsPostDetailModalOpen(true);
    setSelectedId(()=>id);

  };
  const handleCommentsDetailModalClick = (id: string) => {
    setIsCommentsModalOpen(!isCommentsModalOpen);
    setIsCommentsDetailModalOpen(true);
    setSelectedCommentId(()=>id);
  };

  const userId = useAppSelector(state => state.userInfo.id);
  const {
    data: assignmentData,
    isLoading: assignmentLoading,
    isError: assignmentError,
    error: assignmentFetchError,
  } = useGetAssignments(userId);
  // console.log("assignmentData::: ", assignmentData);

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
console.log(filteredAssignments)
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
  console.log(filteredLectureComments)
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
                handleDetailModalClick={handleAssignmentsDetailModalClick}
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
                handleDetailModalClick={handlePostDetailModalClick}
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
                handleDetailModalClick={handleCommentsDetailModalClick}
              />
            }
          />
        )}

        {isAssignmentsDetailModalOpen && (
          <ModalWrapper
            onCloseModal={() => {
              setIsAssignmentsDetailModalOpen(!isAssignmentsDetailModalOpen);
              setSelectedId("");
            }}
            width="748px"
            modalTitle="제출한 과제"
            children={
              <AssignmentsDetailModal
                id={selectedId}
                filteredAssignments={filteredAssignments}
                filteredComments={filteredComments}
              />
            }
          />
        )}
        {isPostDetailModalOpen && (
          <ModalWrapper
            onCloseModal={() => {
              setIsPostDetailModalOpen(!isPostDetailModalOpen);
              setSelectedId("");
            }}
            width="748px"
            children={
              <PostDetailModal
                id={selectedId}
              />
            }
          />
        )}
        {isCommentsDetailModalOpen && (
          <ModalWrapper
            onCloseModal={() => {
              setIsCommentsDetailModalOpen(!isCommentsDetailModalOpen);
              setSelectedCommentId("");
            }}
            width="748px"
            children={
              <CommentsDetailModal
                id={selectedCommentId}
              />
            }
          />
        )}
      </div>
    </>
  );
}
