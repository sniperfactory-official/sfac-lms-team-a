"use client";

import React, { useState, useEffect } from "react";
import PostCard from "@/app/community/(components)/CommunityModal/PostCard";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import LoadingSpinner from "@/components/Loading/Loading";

interface PostDetailModalProps {
  id: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ id }) => {
  const [imageIds, setImageIds] = useState<string[]>([]);

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

  if (postLoading || imageLoading) {
    return <LoadingSpinner />;
  }

  if (postError || imageError) {
    return <span>Error: {(postFetchError as Error).message}</span>;
  }
  return (
    <div className="z-50">
      <PostCard key={id} postData={postData} imageData={imageData} />
    </div>
  );
};
export default PostDetailModal;
