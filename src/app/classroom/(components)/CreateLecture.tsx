"use client";

import React, { useEffect, useState } from "react";
import { LectureContent } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import ModalWrapper from "@/components/ModalWrapper";
import CreateLectureMethod from "./CreateLectureMethod";
import CreateNoteLecture from "./CreateNoteLecture";
import CreateLinkLecture from "./CreateLinkLecture";
import CreateVideoLecture from "./CreateVideoLecture";
import CreateLectureTitle from "./CreateLectureTitle";
import CreatePrivateLecture from "./CreatePrivateLecture";
import CreateLectureTimestamp from "./CreateLectureTimestamp";
import CreateLectureButton from "./CreateLectureButton";

interface Props {
  userId: string;
  courseId: string;
}

export interface CreateLecture {
  userId: string;
  courseId: string;
  title: string;
  isPrivate: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lectureType: "노트" | "비디오" | "링크";
  lectureContent: LectureContent;
}

export default function CreateLecture({ userId, courseId }: Props) {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [method, setMethod] = useState<string>("");
  const [lecture, setLecture] = useState<CreateLecture>({
    userId: "",
    courseId: "s5LYsVcx93Z2a50LZ1vS",
    title: "",
    isPrivate: true,
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lectureType: "노트",
    lectureContent: {
      images: [],
      textContent: "",
      externalLink: "",
      videoUrl: "",
      videoLength: 0,
    },
  });

  console.log(lecture.title);

  useEffect(() => {
    const lectureTypeByMethod: { [key: string]: "노트" | "비디오" | "링크" } = {
      "노트 만들기": "노트",
      "영상 강의 만들기": "비디오",
      "링크 만들기": "링크",
    };

    setLecture(prev => {
      return { ...prev, lectureType: lectureTypeByMethod[method] };
    });
  }, [method]);

  const pageByMethod: { [key: string]: JSX.Element } = {
    "노트 만들기": (
      <CreateNoteLecture setLecture={setLecture}></CreateNoteLecture>
    ),
    "영상 강의 만들기": (
      <CreateVideoLecture setLecture={setLecture}></CreateVideoLecture>
    ),
    "링크 만들기": (
      <CreateLinkLecture setLecture={setLecture}></CreateLinkLecture>
    ),
  };

  const modalOpenHandler = () => {
    setIsCreateModalOpened(prev => !prev);
    setMethod("");
  };

  return (
    <>
      {isCreateModalOpened && (
        <ModalWrapper modalTitle={`강의 만들기`} handleModal={modalOpenHandler}>
          {method ? (
            <div>
              <CreateLectureTitle setLecture={setLecture} />
              {pageByMethod[method]}
              <div className="flex mt-[24px] gap-4">
                <CreateLectureTimestamp setLecture={setLecture} />
                <CreatePrivateLecture setLecture={setLecture} />
                <CreateLectureButton onClick={() => {}} disabled={false}>
                  업로드
                </CreateLectureButton>
              </div>
            </div>
          ) : (
            <CreateLectureMethod setMethod={setMethod}></CreateLectureMethod>
          )}
        </ModalWrapper>
      )}
      <button
        className="w-[115px] h-[35px] bg-primary-80 text-white rounded-[10px] size-[14px] font-bold leading-4"
        onClick={modalOpenHandler}
      >
        강의 만들기
      </button>
    </>
  );
}