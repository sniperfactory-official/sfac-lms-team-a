"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Post } from "@/types/firebase.types";
import { useFetchThumbnail } from "@/hooks/reactQuery/community/useFetchThumbnail";
import { auth } from "@/utils/firebase";
import { useCommentCount } from "@/hooks/reactQuery/comment/useCommentCount";
import ModalWrapper from "../ModalWrapper";
import useDeletePost from "@/hooks/reactQuery/community/useDeletePost";
import { choicePost } from "@redux/postSlice";
import { useAppDispatch } from "@redux/store";
import deleteStorageImages from "@/utils/deleteStorageImages";
import { Avatar } from "sfac-designkit-react";
import timestampToDate from "@/utils/timestampToDate";

const CommunityCard: React.FC<Post> = ({
  user,
  userId,
  id,
  title,
  category,
  content,
  postImages,
  thumbnailImages,
  tags,
  createdAt,
}) => {
  const currentUserId = auth.currentUser?.uid;
  const isAuthor = userId.id === currentUserId;
  const dispatch = useAppDispatch();

  const handleChoicePost = () => {
    // dispatch an action to update the postId in the Redux store
    dispatch(choicePost({ postId: id, type: "detail" }));
  };
  // 썸네일 이미지 url fetching
  const { data: thumbnailImageUrl } = useFetchThumbnail(thumbnailImages);
  // 프로필 이미지

  // 댓글의 개수
  const { data: commentCount } = useCommentCount(id);

  // 게시글에서 삭제 버튼 클릭 시
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteButton = () => {
    setIsDeleteModalOpen(true);
  };

  // 모달창에서 삭제 버튼 클릭 시 로직
  const deleteMutation = useDeletePost();
  const handleDeletePost = () => {
    // 삭제하기 위해서 배열에 이미지, 썸네일을 같이 담는다.
    const pathsToDelete = [...postImages, ...thumbnailImages];

    // 함수 호출해서 이미지 삭제
    deleteStorageImages(pathsToDelete);
    deleteMutation.mutate(id);
    setIsDeleteModalOpen(false);
  };

  //수정하기 함수
  const handleUpdateButton = () => {
    dispatch(choicePost({ postId: id, type: "update" }));
  };

  return (
    <div className="flex flex-col h-[240px] rounded-[4px] border-[1px] border-grayscale-5 p-[20px] mb-[10px] z-1">
      <div className="w-full flex justify-between items-center mb-[10px]">
        <div className="flex justify-between items-center">
          <Avatar
            src={user?.profileImage ?? "/images/avatar.svg"}
            alt="프로필"
            size={34}
            ring={false}
            className="rounded-[50%] object-cover object-center h-[34px] mr-2"
          />
          <span className="text-xs text-primary-80 font-bold">
            {category === "익명피드백" ? "익명" : user?.username}
          </span>
          <span className="text-xs text-grayscale-60 font-medium mx-1">
            • {user?.role} •
          </span>
          <span className="text-xs text-grayscale-60 font-medium">
            {timestampToDate(createdAt).replaceAll(".", "/")}
          </span>
        </div>
        {isAuthor && (
          <div className="text-xs text-grayscale-100 font-normal">
            <button onClick={handleUpdateButton}>수정</button>
            <span className="text-grayscale-30"> | </span>
            <button onClick={handleDeleteButton}>삭제</button>
            {isDeleteModalOpen && (
              <ModalWrapper
                width="500px"
                isCloseButtonVisible={false}
                onCloseModal={() => setIsDeleteModalOpen(false)}
              >
                <div className="text-center flex flex-col justify-center h-[120px]">
                  <h2 className="text-xl font-bold mb-[10px]">
                    게시글을 삭제하시겠습니까?
                  </h2>
                  <div>
                    <button
                      className="bg-grayscale-5 text-grayscale-60 font-bold text-sm px-[46px] py-[6px] rounded-[7px] mr-[8px]"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      className="bg-red text-white font-bold text-sm px-[46px] py-[6px] rounded-[7px]"
                      onClick={handleDeletePost}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </ModalWrapper>
            )}
          </div>
        )}
      </div>

      <button className="flex flex-col" onClick={handleChoicePost}>
        <div className="mb-[10px] flex w-full h-[135px]">
          <div className="flex flex-col items-start w-full">
            <h3 className="text-base font-bold mb-[10px]">{title}</h3>
            <p className="text-sm font-normal text-grayscale-60 mb-[10px] text-left line-clamp-3">
              {content}
            </p>
            <div>
              <div>
                {tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="
                    bg-grayscale-5
                    text-grayscale-60
                    text-[10px] font-medium py-[4px] px-[10px] mr-2 rounded-[4px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {thumbnailImageUrl && (
            <div className="relative w-[119px] h-[119px] flex-shrink-0">
              <Image
                src={thumbnailImageUrl}
                alt="썸네일"
                width={100}
                height={100}
                className="rounded-[10px] object-cover object-center w-[120px] h-[120px]"
                priority
              />
              {postImages.length > 1 && (
                <span
                  className="
                rounded-[50px] bg-primary-5 text-primary-60
                text-[10px] font-bold px-[5px] absolute top-[10px] right-[0px]
                "
                >
                  + {postImages ? postImages.length - 1 : 0}
                </span>
              )}
            </div>
          )}
        </div>
        <span className="text-xs font-normal text-grayscale-60 text-left">
          댓글 {commentCount}개
        </span>
      </button>
    </div>
  );
};

export default CommunityCard;
