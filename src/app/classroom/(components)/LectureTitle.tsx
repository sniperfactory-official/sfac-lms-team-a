import React, { ChangeEvent } from "react";
import { LectureInfo } from "./CreateLecture";

interface Props {
  title?: string;
  setLecture: React.Dispatch<React.SetStateAction<LectureInfo>>;
}

export default function LectureTitle({ title, setLecture }: Props) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLecture(prev => {
      return { ...prev, title: e.target.value };
    });
  };

  return (
    <>
      <label htmlFor="classTitle" className="sr-only">
        강의 제목 입력
      </label>
      <input
        value={title}
        id="classTitle"
        onChange={onInputChange}
        placeholder="제목을 입력해주세요. (선택)"
        className="text-[20px] my-[20px]"
      />
    </>
  );
}
