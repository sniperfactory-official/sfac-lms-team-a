import React, { useState, useEffect } from "react";
import PostCard from "@/components/CommunityModal/PostCard";
import CommentCard from "@/components/CommunityModal/CommentCard";
import { useAppSelector } from "@/redux/store";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import LoadingSpinner from "@/components/Loading/Loading";

interface CommentsDetailModalProps {
  id: string;
}

const CommentsDetailModal: React.FC<CommentsDetailModalProps> = ({ id }) => {
  const [imageIds, setImageIds] = useState<string[]>([""]);
  const [parentId, setParentId] = useState<string>("");
  const userId = useAppSelector(state => state.userInfo.id);

  // 댓글 정보
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
    error: commentFetchError,
  } = useGetSelectedPost(id);

  useEffect(() => {
    if (commentData?.parentId) {
      setParentId(commentData?.parentId);
    }
  }, [commentData]);

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postFetchError,
  } = useGetSelectedPost(parentId);

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
  console.log(imageData);
  if (postLoading || imageLoading || commentLoading) {
    return <LoadingSpinner />;
  }

  if (postError || imageError || commentError) {
    return <span>Error: {(postFetchError as Error).message}</span>;
  }
  return (
    <div className="z-50 w-[748px]">
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
  );
};
export default CommentsDetailModal;
