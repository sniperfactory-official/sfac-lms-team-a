import React from "react";
import { LectureInfo } from "./CreateLecture";

interface Props {
  isPrivate?: boolean;
  setLecture: React.Dispatch<React.SetStateAction<LectureInfo>>;
}

export default function LecturePrivate({ isPrivate, setLecture }: Props) {
  const togglePrivate = () => {
    setLecture(prev => {
      return { ...prev, isPrivate: !prev.isPrivate };
    });
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <span className="text-[14px] font-bold">강의공개</span>
      <input
        type="checkbox"
        value=""
        checked={isPrivate}
        className="sr-only peer"
        onChange={togglePrivate}
      />
      <div
        className="
        w-[48px] 
        h-[24px] 
        rounded-full
        ml-[12px]
        dark:bg-grayscale-10
        after:content-['']
        after:absolute
        after:top-[8px]
        after:left-[64px]
        after:bg-grayscale-30
        after:rounded-full
        after:h-[18px]
        after:w-[18px]
        after:transition-all
        peer-checked:after:translate-x-[120%]
        peer-checked:after:bg-white
        peer-checked:bg-primary-100"
      ></div>
    </label>
  );
}
