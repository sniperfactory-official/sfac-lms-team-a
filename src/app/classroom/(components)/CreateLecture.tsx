"use client";

import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import ModalWrapper from "@/components/ModalWrapper";
import CreateLectureMethod from "./CreateLectureMethod";
import LectureNote from "./LectureNote";
import LectureLink from "./LectureLink";
import LectureVideo from "./LectureVideo";
import LectureTitle from "./LectureTitle";
import LecturePrivate from "./LecturePrivate";
import LectureTimestamp from "./LectureTimestamp";
import LectureButton from "./LectureButton";
import useCreateLecture from "@/hooks/reactQuery/lecture/useCreateLecture";
import Image from "next/image";
import arrow from "/public/images/arrow.svg";
import LoadingSpinner from "@/components/Loading/Loading";

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
  order: number;
  lectureType: "노트" | "비디오" | "링크";
  lectureContent: {
    images: [];
    textContent: string;
    externalLink: string;
    video: File[];
    videoLength: string;
  };
}

export default function CreateLecture({ userId, courseId }: Props) {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [method, setMethod] = useState<string>("");
  const [lecture, setLecture] = useState<CreateLecture>({
    userId: userId,
    courseId: courseId,
    title: "",
    isPrivate: true,
    startDate: Timestamp.now(),
    endDate: Timestamp.fromDate(
      new Date(Timestamp.now().toMillis() + 7 * 24 * 60 * 60 * 1000),
    ),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    order: 0,
    lectureType: "노트",
    lectureContent: {
      images: [],
      textContent: "",
      externalLink: "",
      video: [],
      videoLength: "",
    },
  });

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
    "노트 만들기": <LectureNote setLecture={setLecture}></LectureNote>,
    "영상 강의 만들기": <LectureVideo setLecture={setLecture}></LectureVideo>,
    "링크 만들기": <LectureLink setLecture={setLecture}></LectureLink>,
  };

  const modalOpenHandler = () => {
    setIsCreateModalOpened(prev => !prev);
    setMethod("");
  };

  const { mutate, isLoading } = useCreateLecture(modalOpenHandler);

  const onSubmitBtnClick = () => {
    mutate(lecture);
  };

  return (
    <>
      {isCreateModalOpened && (
        <ModalWrapper
          modalTitle={
            method ? (
              <div className="flex gap-2.5">
                강의 만들기
                {<Image src={arrow} alt="화살표" width="7" height="10" />}{" "}
                {method}
              </div>
            ) : (
              <>강의 만들기</>
            )
          }
          onCloseModal={modalOpenHandler}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : method ? (
            <>
              <LectureTitle setLecture={setLecture} />
              {pageByMethod[method]}
              <div className="flex mt-[24px] justify-between">
                <LectureTimestamp setLecture={setLecture} />
                <LecturePrivate setLecture={setLecture} />
                <LectureButton
                  onClick={onSubmitBtnClick}
                  disabled={
                    !(
                      lecture.lectureContent.video.length ||
                      lecture.lectureContent.externalLink ||
                      lecture.lectureContent.textContent
                    )
                  }
                >
                  업로드
                </LectureButton>
              </div>
            </>
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
