"use client";

import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import LectureCommunityItem from "./CommunityItem";
import { LectureComment } from "@/types/firebase.types";
import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import LectureCommentInput from "./CommentInput";

const LectureCommunityWrapper = ({ lectureId }: { lectureId: string }) => {
  const { data, isLoading } = useGetLectureCommentQuery(lectureId, "");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

  //댓글 혹은 대댓글 넣기
  const modalOpenHandler = () => {
    setCommentModalIsOpen(prev => {
      return !prev;
    });
  };

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }
  if (data !== undefined) {
    return (
      <div className="bg-grayscale-10 w-full h-full p-4 overflow-y-auto">
        {commentModalIsOpen && (
          <ModalWrapper
            handleModal={modalOpenHandler}
            modalTitle={<h1 className="mb-5">댓글달기</h1>}
          >
            <LectureCommentInput
              parentId=""
              mention=""
              replyCount={0}
              lectureId={lectureId}
              mentionHandler={() => {}}
              modalCloseHandler={modalOpenHandler}
            />
          </ModalWrapper>
        )}
        <div className="flex justify-between mb-3">
          <h1 className="font-bold text-xl">강의 커뮤니티</h1>
          <button
            onClick={modalOpenHandler}
            className="bg-primary-80 text-white w-28 h-9 rounded-xl"
          >
            작성
          </button>
        </div>
        <div className="relative">
          {data.map((e, i) => (
            <LectureCommunityItem
              comment={e as LectureComment}
              key={i}
              lectureId={lectureId}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default LectureCommunityWrapper;