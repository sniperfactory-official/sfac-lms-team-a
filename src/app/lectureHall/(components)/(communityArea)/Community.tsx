"use client";

import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import { getTime } from "@/utils/getTime";
import LectureCommunityItem from "./CommunityItem";
import { LectureComment } from "@/types/firebase.types";
import { useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";

const LectureCommunityWrapper = () => {
  const { data, isLoading } = useGetLectureCommentQuery("mVwanklxft7kGVxiCpaq");
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

  console.log(data);

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
            modalTitle={<h1>상세보기</h1>}
          >
            모달 내용 테스트
          </ModalWrapper>
        )}
        <div className="flex justify-between mb-3">
          <h1>강의 커뮤니티</h1>
          <button onClick={modalOpenHandler}>작성</button>
        </div>
        <div className="relative">
          {data.map((e, i) => (
            <LectureCommunityItem comment={e as LectureComment} key={i} />
          ))}
        </div>
      </div>
    );
  }
};

export default LectureCommunityWrapper;
