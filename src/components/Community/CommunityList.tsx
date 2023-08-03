"use client";

import React, { useState, useRef, useEffect } from "react";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import Image from "next/image";
import CommunityCard from "./CommunityCard";
import Aside from "./Aside/Aside";

const CommunityList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 게시물 리스트
  const {
    data: postList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    error,
  } = useGetSelectedPost(activeCategory);

  // Dom에 접근하기 위해 사용
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 로딩 중이거나 더 이상 로드할 페이지가 없는 경우에는 함수 종료
    if (isLoading || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        // 첫 번째 요소가 뷰포트와 교차하는지 확인한다.
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      // 대상 요소 50%가 뷰포트와 교차했을 때 콜백 함수를 호출.
      { threshold: 0.5 },
    );

    const el = loadMoreButtonRef && loadMoreButtonRef.current;
    if (!el) return;
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [isLoading, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-row  w-9/12 ">
      <Aside onCategorySelect={setActiveCategory} />
      <div className="flex flex-col flex-1 ">
        {postList?.pages?.flatMap(page => page.posts)?.length !== 0 ? (
          postList?.pages
            ?.flatMap(page => page.posts)
            ?.map(data => (
              <CommunityCard
                id={data.id}
                userId={data.userId}
                category={data.category}
                parentId={data.parentId}
                key={data.id}
                user={data.user}
                createdAt={data.createdAt}
                updatedAt={data.updatedAt}
                postImages={data.postImages}
                title={data.title}
                content={data.content}
                thumbnailImages={data.thumbnailImages}
                tags={data.tags}
              />
            ))
        ) : (
          <Image
            src="/images/noPostingMessage.svg"
            width={573}
            height={199}
            alt="게시글이 존재하지 않습니다."
            className="absolute top-[199px] left-[531px]"
          />
        )}
      </div>
      <div ref={loadMoreButtonRef} className="opacity-0">
        Load more
      </div>
    </div>
  );
};

export default CommunityList;
