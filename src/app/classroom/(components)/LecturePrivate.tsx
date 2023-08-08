import React from "react";
import { LectureInfo } from "./CreateLecture";

interface Props {
  isPrivate: boolean;
  setLecture: React.Dispatch<React.SetStateAction<LectureInfo>>;
}

export default function LecturePrivate({ isPrivate, setLecture }: Props) {
  const togglePrivate = () => {
    setLecture(prev => {
      return { ...prev, isPrivate: !prev.isPrivate };
    });
  };

  return (
    <div className="flex items-center">
      <label htmlFor="isPrivate" className="text-[16px] font-bold">
        강의공개
      </label>
      <input
        type="checkbox"
        id="isPrivate"
        checked={!isPrivate}
        onChange={togglePrivate}
        className="
          relative 
          shrink-0 
          w-11 
          h-6 
          ml-[12px]
          bg-grayscale-10 
          checked:bg-primary-100 
          border-2 
          border-transparent 
          rounded-full 
          cursor-pointer 
          transition-colors 
          ease-in-out 
          duration-200 
          focus:outline-none 
          appearance-none 
          dark:bg-grayscale-10 
          dark:checked:bg-primary-100 
          before:inline-block 
          before:w-5 
          before:h-5 
          before:bg-grayscale-30 
          checked:before:bg-white 
          before:translate-x-0 
          checked:before:translate-x-full 
          before:rounded-full 
          before:transform 
          before:transition 
          before:ease-in-out 
          before:duration-200 
          dark:before:bg-grayscale-30 
          dark:checked:before:bg-white"
      />
    </div>
  );
}
