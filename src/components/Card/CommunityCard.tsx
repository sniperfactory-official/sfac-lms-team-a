"use client";
import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  content: string;
  tags: string[];
  commentCount: number;
}


const CommunityCard: React.FC<CardProps> = ({ title, content, tags, commentCount }) => {
  return (
    <div className="flex flex-col w-[775px] h-[240px] rounded-[4px] border-[1px] border-grayscale-5 p-[20px]">
      <div className="w-full flex justify-between items-center mb-[10px]">
        <div className="flex justify-between items-center">
          <Image src="/images/avatar.svg" width={34} height={34} alt="로고" />
          <span className="text-xs text-primary-80 font-bold">
            스나이퍼 팩토리
          </span>
          {/* 데이터 받아와야함 */}
          <span className="text-xs text-grayscale-60 font-medium mx-1">
            • 매니저 •
          </span>
          <span className="text-xs text-grayscale-60 font-medium">
            2023/06/28
          </span>
        </div>
        {/* 자기가 쓴 글이 맞다면, */}
        {/* <div className="text-xs text-grayscale-100 font-normal">
          <button
            onClick={() => console.log('clicked 수정')}
          >수정</button>
          <span> | </span>
          <button
            onClick={() => console.log('clicked 삭제')}
          >삭제</button>
        </div> */}
      </div>

      <button className="flex flex-col">
        <div className="mb-[10px] flex w-full h-[135px]">
          <div className="flex flex-col items-start w-full">
            <h3 className="text-base font-bold mb-[10px]">
              {title}
            </h3>
            <p className="text-sm font-normal text-grayscale-60 mb-[10px] text-left">
              {content}
            </p>
            <div>
              <div>
                {
                  tags?.map((tag, idx) => (
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
          {/* 이미지가 있다면, 이미지와 이미지 숫자를 가져옴 */}
          {/* <div className="relative">
            <Image src="/images/avatar.svg" width={119} height={119} alt="글 대표 사진"
              className="ml-[10px] border-solid border-[1px] rounded-[10px] border-primary-60"
            />
            <span className="
          rounded-[50px] bg-primary-5 text-primary-60
          text-[10px] font-bold px-[5px] absolute top-[10px] right-[0px]
          "
            >+ 3</span>
          </div> */}
        </div>
        {/* 댓글 개수 데이터 */}
        <span className="text-xs font-normal text-grayscale-60 text-left">
          댓글 {commentCount}개
        </span>
      </button>
    </div>
  );
};

export default CommunityCard;