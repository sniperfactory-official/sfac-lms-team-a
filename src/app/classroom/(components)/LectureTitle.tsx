import React, { ChangeEvent } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function LectureTitle({ setLecture }: Props) {
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
        id="classTitle"
        onChange={onInputChange}
        placeholder="제목을 입력해주세요. (선택)"
        className="text-[20px] my-[20px]"
      />
    </>
  );
}
