"use client";

import useGetLectureInfo from "@/hooks/reactQuery/lecture/useGetLectureInfo";
import React, { useEffect, useState } from "react";
import { LectureInfo } from "./CreateLecture";
import { Timestamp } from "firebase/firestore";
import LectureButton from "./LectureButton";
import LectureLink from "./LectureLink";
import LectureNote from "./LectureNote";
import LecturePrivate from "./LecturePrivate";
import LectureTitle from "./LectureTitle";
import LectureVideo from "./LectureVideo";
import ModalWrapper from "@/components/ModalWrapper";
import useUpdateLecture from "@/hooks/reactQuery/lecture/useUpdateLecture";
import ClassRoomLoadingSpinner from "@/app/lectureHall/(components)/LoadingSpinner";
import LectureDateSelector from "./LectureDateSelector";
import { Breadcrumb } from "sfac-designkit-react";

interface Props {
  lectureId: string;
}

export default function UpdateLecture({ lectureId }: Props) {
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
  const { data } = useGetLectureInfo(lectureId);
  const [lecture, setLecture] = useState<LectureInfo>({
    title: "",
    isPrivate: false,
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    order: 0,
    lectureType: "노트",
    lectureContent: {
      images: [],
      textContent: "",
      externalLink: "",
      video: [],
      videoUrl: "",
      videoLength: "",
    },
  });

  useEffect(() => {
    if (data) {
      setLecture({
        title: data.title,
        isPrivate: data.isPrivate,
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: data.createdAt,
        updatedAt: Timestamp.now(),
        order: data.order,
        lectureType: data.lectureType,
        lectureContent: data.lectureContent,
      });
    }
  }, [data]);

  const pageByMethod: { [key: string]: JSX.Element } = {
    노트: (
      <LectureNote
        note={lecture.lectureContent?.textContent}
        setLecture={setLecture}
      ></LectureNote>
    ),
    비디오: (
      <LectureVideo
        video={lecture.lectureContent?.video}
        setLecture={setLecture}
      ></LectureVideo>
    ),
    링크: (
      <LectureLink
        link={lecture.lectureContent?.externalLink}
        setLecture={setLecture}
      ></LectureLink>
    ),
  };

  const modalHandler = () => {
    setIsUpdateModalOpened(prev => !prev);
  };

  const { mutate, isLoading } = useUpdateLecture(modalHandler);

  const onSubmitBtnClick = () => {
    mutate({ lecture, lectureId });
  };

  return (
    <>
      {isUpdateModalOpened && (
        <ModalWrapper
          modalTitle={<Breadcrumb menu={["강의 수정", "수정하기"]} />}
          onCloseModal={modalHandler}
        >
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center p-10">
              <ClassRoomLoadingSpinner />
            </div>
          ) : (
            <>
              <LectureTitle title={lecture.title} setLecture={setLecture} />
              {pageByMethod[lecture.lectureType]}
              <div className="flex mt-[24px] justify-between">
                <LectureDateSelector
                  startDate={lecture.startDate}
                  endDate={lecture.endDate}
                  setLecture={setLecture}
                />
                <LecturePrivate
                  isPrivate={lecture.isPrivate}
                  setLecture={setLecture}
                />
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
          )}
        </ModalWrapper>
      )}
      <button className="text-[12px]" onClick={modalHandler}>
        수정
      </button>
    </>
  );
}
