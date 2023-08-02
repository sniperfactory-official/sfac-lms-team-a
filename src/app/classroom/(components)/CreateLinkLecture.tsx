"use client";

import React, { ChangeEvent } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function CreateLinkLecture({ setLecture }: Props) {
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
        type="text"
        id="link"
        placeholder="https://..."
        className="w-[700px] h-[42px] border border-grayscale-10 text-[16px] pl-[12px] py-[8px] rounded-xl"
        onChange={onChangeHandler}
      />
    </div>
  );
}
