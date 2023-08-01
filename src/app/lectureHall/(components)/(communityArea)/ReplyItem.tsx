import useDeleteLectureCommentMutation from "@/hooks/reactQuery/lecture/useDeleteLectureComment";
import { LectureComment } from "@/types/firebase.types";
import { getTime } from "@/utils/getTime";
import { useState } from "react";
import LectureCommunityCommentModify from "./CommentModify";

const ReplyItem = ({
  comment,
  lectureId,
  mentionHandler,
  modalCloseHandler,
}: {
  comment: LectureComment;
  lectureId: string;
  mentionHandler: (inputText: string) => void;
  modalCloseHandler: () => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const onClick = () => {
    if (comment.user !== undefined) {
      console.log(comment.user.username);
      mentionHandler(comment.user?.username);
    }
  };
  const modifyHandler = () => {
    setIsEdit(prev => {
      return !prev;
    });
  };

  const { mutate } = useDeleteLectureCommentMutation(lectureId);

  const commentDeleteHandler = () => {
    if (comment.id !== undefined) {
      mutate(comment.id, {
        onSuccess: () => {
          modalCloseHandler();
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
          <div className="w-11">{comment.user?.profileImage}</div>
          <div className="flex-1">
            <div className="flex mb-2">
              <div className="mr-1 text-base font-bold">
                {comment.user?.username}
              </div>{" "}
              ·{" "}
              <div className="text-grayscale-40 ml-1">{comment.user?.role}</div>
            </div>
            <div className="text-sm w-full flex">{comment.content}</div>
          </div>
          <div className="">
            <button
              onClick={onClick}
              className="text-grayscale-40 text-xs mb-2 mr-2"
            >
              답글달기
            </button>
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
