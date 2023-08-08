"use client";
import LectureHallHeader from "./Header";
import type { Lecture, User } from "@/types/firebase.types";
import useGetLectureInfoQuery from "@/hooks/reactQuery/lecture/useGetLectureInfoQuery";
import LetcureContent from "./(LetcureArea)/LectureContent";
import LectureCommunityWrapper from "./(communityArea)/Community";
import LectureFooter from "./(LetcureArea)/Footer";

import ClassRoomLoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import timeToSeconds from "@/utils/timeToSecnods";

export interface LectureSummary
  extends Omit<
    Lecture,
    | "userId"
    | "course"
    | "courseId"
    | "isPrivate"
    | "createdAt"
    | "updatedAt"
    | "lectureType"
    | "lectureContent"
  > {}

const ContentArea = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetLectureInfoQuery(id);
  const [nowPlayTime, setNowPlayTime] = useState(0);
  const nowPlayTimeHandler = (time: string) => {
    const result = timeToSeconds(time);
    setNowPlayTime(result);
  };
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClassRoomLoadingSpinner />
      </div>
    );
  } else if (!isLoading && data !== undefined && data.user) {
    return (
      <div className="w-full h-screen flex flex-col">
        <LectureHallHeader LetcureInfo={data} />
        <div className="w-full flex-1">
          <div className="flex w-full h-full">
            <div className="flex-[7] lg:flex-[8] h-[90%]">
              <LetcureContent
                setNowPlayTime={setNowPlayTime}
                nowPlayTime={nowPlayTime}
                contentType={{
                  lectureType: data.lectureType,
                  lectureContent: data.lectureContent,
                  id: data.id,
                }}
              />
              <div className="w-full h-[11%] border-t-2 border-grayscale-5">
                <LectureFooter lectureId={id} />
              </div>
            </div>
            <div className="flex-[3] lg:flex-[2] h-full max-h-[820px] ">
              <LectureCommunityWrapper
                lectureId={data.id}
                nowPlayTimeHandler={nowPlayTimeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ContentArea;
