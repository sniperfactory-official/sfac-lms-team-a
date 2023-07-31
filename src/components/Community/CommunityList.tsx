import React, { useState } from "react";
import Aside from "@/components/Aside/Aside";
import CommunityCard from "@/components/Card/CommunityCard";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";

const TEST_DATA = [
  {
    category: "필독",
    title: "안녕",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ",
    tags: ["자바", "플러터", "자스"],
    commentCount: 4,
  },
  {
    category: "안내사항",
    title: "하이",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ",
    tags: ["스프링", "리액트", "뷰"],
    commentCount: 0,
  },
  {
    category: "질문있어요",
    title: "올라",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ",
    tags: ["스프링", "리액트", "뷰"],
    commentCount: 7,
  },
  {
    category: "자유게시판",
    title: "봉주르",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into ",
    tags: ["스프링", "리액트", "뷰"],
    commentCount: 5,
  },
  {
    category: "익명 피드백",
    title: "곤니찌와",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into  ",
    tags: ["스프링", "리액트", "뷰"],
    commentCount: 3,
  },
];

const CommunityList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
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
          key={data.title}
          title={data.title}
          content={data.content}
          tags={data.tags}
          commentCount={3}
        />
      ))}
    </div>
  );
};

export default CommunityList;
