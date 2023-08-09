import useDeleteLectureCommentMutation from "@/hooks/reactQuery/lecture/useDeleteLectureComment";
import { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import LectureCommunityCommentModify from "./CommentModify";
import Image from "next/image";
import LectureCommentContentMention from "./CommentContent";

const ReplyItem = ({
  comment,
  lectureId,
  userId,
  mentionHandler,
  modalCloseHandler,
  nowPlayTimeHandler,
}: {
  comment: LectureComment;
  lectureId: string;
  userId: string;
  nowPlayTimeHandler: (time: string) => void;
  mentionHandler: (inputText: string) => void;
  modalCloseHandler: () => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const onClick = () => {
    if (comment.user !== undefined) {
      mentionHandler(comment.user?.username);
    }
  };
  const modifyHandler = () => {
    setIsEdit(prev => {
      return !prev;
    });
  };
  console.log(comment.userId.id);
  const { mutate } = useDeleteLectureCommentMutation(lectureId);

  const commentDeleteHandler = () => {
    if (comment.id !== undefined) {
      mutate(comment.id, {
        onSuccess: () => {
          // 답글이 아닌 댓글인 경우에만 모달 닫기
          if (comment.parentId === "") {
            modalCloseHandler();
          }
        },
      });
    }
  };
  return (
    <>
      {isEdit ? (
        <LectureCommunityCommentModify
          comment={comment}
          lectureId={lectureId}
          editHandler={modifyHandler}
        />
      ) : (
        <div className="w-full mb-3 min-h-[90px] bg-white rounded-2xl p-4  flex items-center justify-center border-grayscale-10 border-2">
          <div className="w-11 relative h-11 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
            {comment.user &&
              (comment.user.profileImage === (undefined || "") ? (
                <Image
                  src="/images/logo.svg"
                  width={30}
                  height={30}
                  objectFit="cover"
                  alt="프로필 이미지"
                  className="ml-2 mr-2"
                />
              ) : (
                <Image
                  src={comment.user.profileImage}
                  fill
                  alt="프로필 이미지"
                  objectFit="cover"
                />
              ))}
          </div>
          <div className="flex-1">
            <div className="flex mb-2">
              <div className="mr-1 text-base font-bold">
                {comment.user?.username}
              </div>{" "}
              ·{" "}
              <div className="text-grayscale-40 ml-1">{comment.user?.role}</div>
            </div>
            <div className="text-sm w-full flex">
              <LectureCommentContentMention
                nowPlayTimeHandler={nowPlayTimeHandler}
                content={comment.content}
              />
            </div>
          </div>
          <div className="">
            {userId !== comment.userId.id ? (
              <button
                onClick={onClick}
                className="text-grayscale-40 text-xs mb-2 mr-2"
              >
                답글달기
              </button>
            ) : (
              <>
                <button
                  onClick={modifyHandler}
                  className="text-grayscale-40 text-xs mb-2 mr-2"
                >
                  수정
                </button>
                <button
                  className="text-grayscale-40 text-xs mb-2"
                  onClick={commentDeleteHandler}
                >
                  삭제
                </button>
              </>
            )}

            <div className="text-grayscale-40 text-xs ">
              {getTime(comment.createdAt.toDate())}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyItem;
