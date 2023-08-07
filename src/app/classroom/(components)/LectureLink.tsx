"use client";

import React, { ChangeEvent } from "react";
import { LectureInfo } from "./CreateLecture";

interface Props {
  link?: string;
  setLecture: React.Dispatch<React.SetStateAction<LectureInfo>>;
}

export default function LectureLink({ link, setLecture }: Props) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLecture(prev => {
      return {
        ...prev,
        lectureContent: {
          ...prev.lectureContent,
          externalLink: e.target.value,
        },
      };
    });
  };

  return (
    <div>
      <label htmlFor="link" className="sr-only">
        강의 링크 입력
      </label>
      <input
        value={link}
        type="text"
        id="link"
        placeholder="https://..."
        className="w-[700px] h-[42px] border border-grayscale-10 text-[16px] pl-[12px] py-[8px] rounded-xl"
        onChange={onChangeHandler}
      />
    </div>
  );
}
