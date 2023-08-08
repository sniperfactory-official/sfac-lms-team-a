"use client"

import React, { useState, useEffect } from "react";
import PostCard from "@/components/CommunityModal/PostCard";
import { useAppSelector } from "@/redux/store";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import LoadingSpinner from "@/components/Loading/Loading";

const PostDetailModal = ({id}) => {
  const [imageIds, setImageIds] = useState<string[]>([]);
console.log("id", id);
  
    // 글 정보
    const {
      data: postData,
      isLoading: postLoading,
      isError: postError,
      error: postFetchError,
    } = useGetSelectedPost(id);

    useEffect(() => {
      if (postData?.postImages) {
        setImageIds(postData.postImages);
      }
    }, [postData]);
    // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
  } = useGetPostImage(imageIds);

    if (
      postLoading ||   
       imageLoading
    ) {
      return <LoadingSpinner />;
    }
  
    if (postError || imageError) {
      return <span>Error: {(postFetchError as Error).message}</span>;
    }
  return (
      <div className="z-50">
      <PostCard
        key={id}
        postData={postData}
        imageData={imageData}
      />
    </div>
  )
}
export default PostDetailModal;