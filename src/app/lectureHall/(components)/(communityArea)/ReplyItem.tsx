import useDeleteLectureCommentMutation from "@/hooks/reactQuery/lecture/useDeleteLectureComment";
import { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import LectureCommunityCommentModify from "./CommentModify";
import Image from "next/image";
import LectureCommentContentMention from "./CommentContent";
import ClassRoomLoadingSpinner from "../LoadingSpinner";
import { Avatar, Text } from "sfac-designkit-react";

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
  const { mutate, isLoading: isDeleteMutating } =
    useDeleteLectureCommentMutation(lectureId);

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
          {isDeleteMutating && (
            <div className="inset-0 fixed bg-[rgba(0,0,0,0.3)] z-[1000000] flex justify-center items-center">
              <ClassRoomLoadingSpinner />
            </div>
          )}
          <div className="w-10 relative h-10 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
            {comment.user && (
              <Avatar
                src={comment.user.profileImage}
                ring={false}
                className="object-cover w-full h-full rounded-full"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex mb-2 gap-[4px] items-center">
              <Text size="base" weight="bold" className="mr-1">
                {comment.user?.username}
              </Text>{" "}
              <div className="rounded-full h-[5px] w-[5px] bg-grayscale-20"></div>{" "}
              <Text
                size="base"
                weight="medium"
                className="text-grayscale-40 ml-1"
              >
                {comment.user?.role}
              </Text>
            </div>
            <div className="text-sm w-full flex">
              <LectureCommentContentMention
                nowPlayTimeHandler={nowPlayTimeHandler}
                content={comment.content}
              />
            </div>
          </div>
          <div className="flex flex-col">
            {userId !== comment.userId.id ? (
              <button onClick={onClick} className="text-xs mb-2">
                답글달기
              </button>
            ) : (
              <div>
                <button onClick={modifyHandler} className=" text-xs mb-2">
                  수정
                </button>
                <Text
                  size="sm"
                  weight="medium"
                  className="text-grayscale-40 ml-1 mr-1"
                >
                  |
                </Text>
                <button
                  className=" text-xs mb-2"
                  onClick={commentDeleteHandler}
                >
                  삭제
                </button>
              </div>
            )}

            <div className="text-grayscale-40 text-xs ml-auto">
              {getTime(comment.createdAt.toDate())}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyItem;
