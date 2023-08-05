"use client";
import { Lecture } from "@/types/firebase.types";
import LectureVideo from "./Video";
import LectureNote from "./Note";

const LetcureContent = ({
  contentType,
}: {
  contentType: Pick<Lecture, "lectureType" | "lectureContent">;
}) => {
  return (
    <div className="w-full h-full">
      {contentType.lectureType === "비디오" ? (
        <LectureVideo videoContent={contentType.lectureContent.videoUrl} />
      ) : (
        <LectureNote content={contentType.lectureContent.textContent} />
      )}
    </div>
  );
};

export default LetcureContent;
