"use client";

import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import LectureCommunityItem from "./CommunityItem";
import { LectureComment } from "@/types/firebase.types";
import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import LectureCommentInput from "./CommentInput";
import ClassRoomLoadingSpinner from "../LoadingSpinner";
import { Button, Title } from "sfac-designkit-react";

const LectureCommunityWrapper = ({
  lectureId,
  nowPlayTimeHandler,
}: {
  lectureId: string;
  nowPlayTimeHandler: (time: string) => void;
}) => {
  const { data, isLoading } = useGetLectureCommentQuery(lectureId, "");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

  //댓글 혹은 대댓글 넣기
  const modalOpenHandler = () => {
    setCommentModalIsOpen(prev => {
      return !prev;
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClassRoomLoadingSpinner />
      </div>
    );
  }
  if (data !== undefined) {
    return (
      <div className="bg-grayscale-10 w-full h-full p-4 overflow-y-auto">
        {commentModalIsOpen && (
          <ModalWrapper
            width="w-[776px]"
            onCloseModal={modalOpenHandler}
            modalTitle={
              <Title size="xl" className="mb-5">
                댓글달기
              </Title>
            }
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
        <div className="flex justify-between mb-3 items-center pt-3 pb-3">
          <Title size="xl">강의 커뮤니티</Title>
          <Button
            textSize="sm"
            textWeight="medium"
            asChild
            type="submit"
            variant="primary"
            onClick={modalOpenHandler}
            className="bg-primary-80 text-white w-28 h-9 rounded-xl flex items-center"
            text="작성"
          ></Button>
        </div>
        <div className="relative">
          {data.map((e, i) => (
            <LectureCommunityItem
              comment={e as LectureComment}
              key={i}
              lectureId={lectureId}
              nowPlayTimeHandler={nowPlayTimeHandler}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default LectureCommunityWrapper;
