import React, { useState } from "react";
import CommunityCard from "@/components/Card/CommunityCard";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import Aside from "./Aside/Aside";

const CommunityList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 게시물 리스트
  const {
    data: postList,
    isLoading,
    isError,
    error,
  } = useGetSelectedPost(activeCategory);

  if (!isLoading) {
    console.log(activeCategory);

    console.log(postList);
  }

  return (
    <div>
      <Aside onCategorySelect={setActiveCategory} />
      {postList?.map(data => (
        <CommunityCard
          id={data.id}
          userId={data.userId}
          parentId={data.parentId}
          key={data.id}
          user={data.user}
          createdAt={data.createdAt}
          postImages={data.postImages}
          title={data.title}
          content={data.content}
          thumbnailImages={data.thumbnailImages}
          tags={data.tags}
        />
      ))}
    </div>
  );
};

export default CommunityList;
