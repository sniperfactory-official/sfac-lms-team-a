"use client";

import { Lecture, Progress } from "@/types/firebase.types";
import LectureNote from "./Note";
import ExternalLink from "./externalLink";
import dynamic from "next/dynamic";
import useGetVideoProgress from "@/hooks/reactQuery/lecture/useGetVideoProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LectureVideoDynamicImport = dynamic(
  () => import("@/app/lectureHall/(components)/(LetcureArea)/Video"),
  {
    ssr: false,
  },
);

const LetcureContent = ({
  contentType,
  nowPlayTime,
  setNowPlayTime,
}: {
  setNowPlayTime: React.Dispatch<React.SetStateAction<number>>;
  nowPlayTime: number;
  contentType: Pick<Lecture, "id" | "lectureType" | "lectureContent">;
}) => {
  const { id: userId } = useSelector((store: RootState) => store.userInfo);
  const { data } = useGetVideoProgress(contentType.id, userId);
  const resetTimeHandler = () => {
    setNowPlayTime(0);
  };

  return (
    <div className="w-full h-full">
      {contentType.lectureType === "비디오" && data !== undefined && (
        <LectureVideoDynamicImport
          resetTimeHandler={resetTimeHandler}
          nowPlayTime={nowPlayTime}
          lectureId={contentType.id}
          userId={userId}
          videoContent={contentType.lectureContent.videoUrl}
          progress={data as Progress | null}
        />
      )}
      {contentType.lectureType === "노트" && (
        <LectureNote content={contentType.lectureContent.textContent} />
      )}
      {contentType.lectureType === "링크" && (
        <ExternalLink content={contentType.lectureContent.externalLink} />
      )}
    </div>
  );
};

export default LetcureContent;
