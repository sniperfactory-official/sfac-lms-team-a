"use client";

import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import LoadingSpinner from "@/components/Loading/Loading";
import Image from "next/image";
import 화살표 from "/public/images/화살표.svg";
import useFetchUserComment from "@/hooks/reactQuery/comment/useComment";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import { useAppSelector } from "@/redux/store";
import ImageModal from "./ImageModal";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";
import CommentInput from "./CommentInput";
import useNestedComment from "@/hooks/reactQuery/comment/useNestedComment";
import { DocumentData } from "@firebase/firestore";

interface NestedId {
  parentId: string | undefined;
  tagId: string | undefined;
}

export default function CommunityModal() {
  // const postId = "YiJVx6OQBhlGGRCUj1WU";
  const postId = useAppSelector(state => state.postInfo.postId);
  // const userId="HNjyTagV4fgalY53duWJSS5ugdw1"
  const userId = useAppSelector(state => state.userInfo.id);
  // console.log(userId2);

  // 이미지 모달
  const [isImageModalOn, setIsImageModalOn] = useState(false);
  const [SelectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const [updateId, setUpdateId] = useState<DocumentData | undefined>(undefined);
  const [nestedId, setNestedId] = useState<NestedId | undefined>(undefined);
  const [commentIds, setCommentIds] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);

  // Fetch the comment IDs and set them to the state when commentData is available

  const handleModalOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedImg(e.currentTarget.value);
    setIsImageModalOn(prev => !prev);
  };

  const handleUpdateId = (updateId: DocumentData | undefined) => {
    setUpdateId(updateId);
  };

  const handleNestedId = (nestedId: NestedId | undefined) => {
    setNestedId(nestedId);
  };

  // 글 정보
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postFetchError,
  } = useGetSelectedPost(postId);

  // 유저 정보
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  // 유저 댓글
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
    error: commentFetchError,
  } = useFetchUserComment(postId);

  useEffect(() => {
    if (postData?.postImages) {
      setImageIds(postData.postImages);
    }
  }, [postData]);

  useEffect(() => {
    if (commentData) {
      const ids = commentData.map(x => x.id);
      setCommentIds(ids);
    }
  }, [commentData]);

  // 유저 대댓글
  const {
    data: nestedCommentData,
    isLoading: nestedCommentLoading,
    isError: nestedError,
    error: nestedFetchError,
  } = useNestedComment(commentIds);

  // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage(imageIds);

  if (
    postLoading ||
    nestedCommentLoading ||
    userLoading ||
    commentLoading ||
    imageLoading
  ) {
    return <LoadingSpinner />;
  }

  if (postError || nestedError || userError || commentError || imageError) {
    return <span>Error: {(postFetchError as Error).message}</span>;
  }

  return (
    <div className="z-50">
      <PostCard
        postData={postData}
        imageData={imageData}
        handleModalOn={handleModalOn}
      />
      {commentData?.map((comment, idx) => (
        <div key={idx}>
          <CommentCard
            comment={comment}
            commentData={comment}
            postId={postId}
            userId={userId}
            handleUpdateId={handleUpdateId}
            handleNestedId={handleNestedId}
          />
          {nestedCommentData
            ?.filter((el, idx) => comment.id === el.parentId)
            .map((nestedComment, idx) => (
              <div className="flex" key={idx}>
                <Image
                  src={화살표}
                  alt="대댓글 화살표"
                  className="ml-2 mr-[5px]"
                ></Image>
                <CommentCard
                  comment={nestedComment}
                  commentData={comment}
                  userId={userId}
                  handleUpdateId={handleUpdateId}
                  handleNestedId={handleNestedId}
                />
              </div>
            ))}
        </div>
      ))}
      <CommentInput
        postData={postData}
        userData={userData}
        postId={postId}
        updateId={updateId}
        nestedId={nestedId}
        handleUpdateId={handleUpdateId}
        handleNestedId={handleNestedId}
      />
      {isImageModalOn && SelectedImg && (
        <ImageModal handleModalOn={handleModalOn} props={SelectedImg} />
      )}
    </div>
  );
}
