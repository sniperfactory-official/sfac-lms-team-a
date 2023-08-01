"use client";

import { LectureContent } from "@/types/firebase.types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function CreateLinkLecture({ setLecture }: Props) {
  const [lectureContent, setLectureContent] = useState<LectureContent>({
    images: [],
    textContent: "",
    externalLink: "",
    videoUrl: "",
    videoLength: 0,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLectureContent(prev => {
      return { ...prev, externalLink: e.target.value };
    });
  };

  useEffect(() => {
    setLecture(prev => {
      return { ...prev, lectureContent: lectureContent };
    });
  }, [setLecture, lectureContent]);

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
