"use client";

import { Lecture } from "@/types/firebase.types";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function CreateLectureTitle({ setLecture }: Props) {
  const [title, setTitle] = useState<string>("");

  const onInputChange = (e: ChangeEvent) => {
    setTitle((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setLecture(prev => {
      return { ...prev, title: title };
    });
  }, [setLecture, title]);

  return (
    <>
      <label htmlFor="classTitle" className="sr-only">
        강의 제목 입력
      </label>
      <input
        id="classTitle"
        onChange={onInputChange}
        placeholder="제목을 입력해주세요. (선택)"
        className="text-[20px] my-[20px]"
      />
    </>
  );
}
