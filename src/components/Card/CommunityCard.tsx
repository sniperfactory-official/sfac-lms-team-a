"use client";

import Image from "next/image";
import React from "react";
import { Post } from "@/types/firebase.types";
import { useFetchThumbnail } from "@/hooks/reactQuery/community/useFetchThumbnail";
import { auth } from "@/utils/firebase";
import { useCommentCount } from "@/hooks/reactQuery/comment/useCommentCount";

const CommunityCard: React.FC<Post> = ({
  user,
  userId,
  id,
  title,
  content,
  postImages,
  thumbnailImages,
  tags,
  createdAt,
}) => {
  const currentUserId = auth.currentUser?.uid;
  const isAuthor = userId.id === currentUserId;

  // 썸네일 이미지 url fetching
  const { data: thumbnailImageUrl } = useFetchThumbnail(thumbnailImages);

  // 댓글의 개수
  const { data: commentCount } = useCommentCount(id);

  return (
    <div className="flex flex-col w-[775px] h-[240px] rounded-[4px] border-[1px] border-grayscale-5 p-[20px] mb-[10px]">
      <div className="w-full flex justify-between items-center mb-[10px]">
        <div className="flex justify-between items-center">
          <Image
            src={user?.profileImage ? user?.profileImage : "/images/avatar.svg"}
            width={34}
            height={34}
            alt="프로필 이미지"
          />
          <span className="text-xs text-primary-80 font-bold">
            {user?.username}
          </span>
          <span className="text-xs text-grayscale-60 font-medium mx-1">
            • {user?.role} •
          </span>
          <span className="text-xs text-grayscale-60 font-medium">
            {createdAt?.toDate().getFullYear()}/
            {createdAt?.toDate().getMonth() + 1 < 10
              ? "0" + (createdAt?.toDate().getMonth() + 1)
              : createdAt?.toDate().getMonth() + 1}
            /
            {createdAt?.toDate().getDate() < 10
              ? "0" + createdAt?.toDate().getDate()
              : createdAt?.toDate().getDate()}
          </span>
        </div>
        {isAuthor && (
          <div className="text-xs text-grayscale-100 font-normal">
            <button onClick={() => console.log("clicked 수정")}>수정</button>
            <span className="text-grayscale-30"> | </span>
            <button onClick={() => console.log("clicked 삭제")}>삭제</button>
          </div>
        )}
      </div>

      <button className="flex flex-col">
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
            <div className="relative">
              <Image
                src={thumbnailImageUrl}
                width={119}
                height={119}
                alt="썸네일"
                className="ml-[10px] border-solid border-[1px] rounded-[10px]"
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
