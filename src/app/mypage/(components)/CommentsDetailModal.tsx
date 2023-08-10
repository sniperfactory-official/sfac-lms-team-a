import React, { useState, useEffect } from "react";
import PostCard from "@/app/community/(components)/CommunityModal/PostCard";
import CommentCard from "@/app/community/(components)/CommunityModal/CommentCard";
import LoadingSpinner from "@/components/Loading/Loading";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import { useAppSelector } from "@/redux/store";
import { Avatar } from "sfac-designkit-react";
import { Timestamp } from "@firebase/firestore";
import timestampToDate from "@/utils/timestampToDate";

type LectureCommentProps = {
  id: string;
  title: string;
  content: string;
  category: string;
  parentId?: string;
  createdAt: Timestamp;
};

interface CommentsDetailModalProps {
  id: string;
  comments: LectureCommentProps[];
}

const CommentsDetailModal: React.FC<CommentsDetailModalProps> = ({
  id,
  comments,
}) => {
  const [imageIds, setImageIds] = useState<string[]>([""]);
  const [parentId, setParentId] = useState<string>("");
  const userInfo = useAppSelector(state => state.userInfo);

  const targetComment = comments.filter(comment => comment.id === id);
  const lectureComment = !targetComment[0]?.parentId ? targetComment[0] : null;

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
  console.log(commentData);
  // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage(imageIds);
  if (imageLoading) return <LoadingSpinner />;

  return (
    <div className="z-50 w-full">
      {commentData?.user && (
        <>
          <PostCard key={parentId} postData={postData} imageData={imageData} />
          <div key={id}>
            <CommentCard
              comment={commentData}
              commentData={commentData}
              postId={id}
              userId={userInfo.id}
            />
          </div>
        </>
      )}
      {lectureComment && (
        <>
          <div className="flex flex-1 flex-col text-base border-solid border gap-3 border-gray-200 rounded-xl p-8 my-3 ">
            <div className="text-xl">{lectureComment.category}</div>
            <div>강의 정보 : {lectureComment.title}</div>
          </div>
          <div className="flex flex-1 items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-3 ">
            <Avatar
              src={userInfo.profileImage || "/images/avatar.svg"}
              alt="프로필"
              size={43}
              ring={false}
              className="rounded-[50%] object-cover object-center h-[43px] mr-2"
            />
            <div className=" w-full">
              <div className="flex items-center">
                <div className="flex items-center flex-1">
                  <span>{userInfo.username}</span>
                  <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
                  <span className="text-gray-400">{userInfo.role}</span>
                </div>
                <div>
                  {timestampToDate(lectureComment.createdAt).replaceAll(
                    ".",
                    "/",
                  )}
                </div>
              </div>
              <div>{lectureComment.content}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CommentsDetailModal;
