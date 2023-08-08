"use client";

import { Lecture } from "@/types/firebase.types";
import LectureVideo from "./Video";
import LectureNote from "./Note";
import ExternalLink from "./externalLink";

const LetcureContent = ({
  contentType,
}: {
  contentType: Pick<Lecture, "lectureType" | "lectureContent">;
}) => {
  return (
    <div className="w-full h-full">
      {contentType.lectureType === "비디오" && (
        <LectureVideo videoContent={contentType.lectureContent.videoUrl} />
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
