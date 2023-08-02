"use client";

import ModalWrapper from "@/components/ModalWrapper";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import LoadingSpinner from "@/components/Loading/Loading";
import Image from "next/image";
import 화살표 from "/public/images/화살표.svg";
import useFetchUserComment from "@/hooks/reactQuery/comment/useComment";
import useGetPostQuery from "@/hooks/reactQuery/useGetPostQuery";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import { useAppSelector } from "@/redux/store";
import ImageModal from "./ImageModal";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";
import CommentInput from "./CommentInput";
import useNestedComment from "@/hooks/reactQuery/comment/useNestedComment";

export default function CommunityModal() {
  const postId = "YiJVx6OQBhlGGRCUj1WU";

  const userId = useAppSelector(state => state.userId.uid);

  // 이미지 모달
  const [isModalOn, setIsModalOn] = useState(false);
  const [SelectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const [updateId, setUpdateId] = useState<object | undefined>();
  const [nestedId, setNestedId] = useState<object | undefined>();

  const [commentIds, setCommentIds] = useState<string[]>([]);

  // Fetch the comment IDs and set them to the state when commentData is available

  const handleModalOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedImg(e.currentTarget.value);
    setIsModalOn(prev => !prev);
  };

  const handleUpdateId = (updateId: object) => {
    setUpdateId(updateId);
  };

  const handleNestedId = (nestedId: object) => {
    setNestedId(nestedId);
  };

  // 글 정보
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
    error: postFetchError,
  } = useGetPostQuery(postId);

  // 유저 정보
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage(postData ? postData.postImages : []);

  // 유저 댓글
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
    error: commentFetchError,
  } = useFetchUserComment(postId);

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
    // if (postError) {
    //   console.log("포스트에러");
    // }
    // else if (nestedError) {
    //   console.log("대댓에러");
    // }
    // else if (userError) {
    //   console.log("유저에러");
    // }
    // else if (commentError) {
    //   console.log("댓글에러");
    // }
    // else if (imageError) {
    //   console.log("이미지에러");
    // }

    return;
    // return <span>Error: {(postFetchError as Error).message}</span>;
  }

  return (
    <>
      <ModalWrapper
        modalTitle="상세보기"
        handleModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <PostCard
          postData={postData}
          imageData={imageData}
          handleModalOn={handleModalOn}
        />
        {commentData?.map((comment, idx) => (
          <div key={idx}>
            <CommentCard
              comment={comment}
              postData={postData}
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
                    postData={postData}
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
      </ModalWrapper>
      {isModalOn && SelectedImg && (
        <ImageModal handleModalOn={handleModalOn} props={SelectedImg} />
      )}
    </>
  );
}
