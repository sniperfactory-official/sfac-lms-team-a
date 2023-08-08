import React, { useState, useEffect } from "react";
import PostCard from "@/components/CommunityModal/PostCard";
import CommentCard from "@/components/CommunityModal/CommentCard";
import { useAppSelector } from "@/redux/store";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import LoadingSpinner from "@/components/Loading/Loading";

const CommentsDetailModal = ({ id }) => {
  console.log("id", id);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string[]>([]);

  const userId = useAppSelector(state => state.userInfo.id);
  // 댓글 정보
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
    error: commentFetchError,
  } = useGetSelectedPost(id);
  console.log("댓글정보", commentData);

  useEffect(() => {
    if (commentData?.parentId) {
      setParentId(commentData?.parentId);
    }
  }, [commentData]);

  console.log("글id", parentId);

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postFetchError,
  } = useGetSelectedPost(parentId);
  console.log("글data", postData);

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
    error: imageFetchError,
  } = useGetPostImage(imageIds);

  if (postLoading || imageLoading || commentLoading) {
    return <LoadingSpinner />;
  }

  if (postError || imageError || commentError) {
    return <span>Error: {(postFetchError as Error).message}</span>;
  }
  return (
    <div>
      <div className="z-50">
        <PostCard key={parentId} postData={postData} imageData={imageData} />

        <div key={id}>
          <CommentCard
            comment={commentData}
            commentData={commentData}
            postId={id}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};
export default CommentsDetailModal;
