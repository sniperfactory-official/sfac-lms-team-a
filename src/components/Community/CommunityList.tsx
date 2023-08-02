import React, { useState } from "react";
import CommunityCard from "@/components/Card/CommunityCard";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import Aside from "./Aside/Aside";
import Image from "next/image";

const CommunityList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 게시물 리스트
  const {
    data: postList,
    isLoading,
    isError,
    error,
  } = useGetSelectedPost(activeCategory);

  if (isLoading) {
    console.log(activeCategory);

    console.log(postList);
  }

  return (
    <div className="ml-[470px]">
      <Aside onCategorySelect={setActiveCategory} />
      {postList?.length !== 0 ? (
        postList?.map(data => (
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
  );
};

export default CommunityList;
