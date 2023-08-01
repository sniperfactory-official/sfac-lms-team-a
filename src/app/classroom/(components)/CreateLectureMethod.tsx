"use client";

import React, { useState } from "react";
import Image from "next/image";
import note from "/public/images/note.svg";
import video from "/public/images/video.svg";
import link from "/public/images/link.svg";
import CreateLectureButton from "./CreateLectureButton";

interface Props {
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}

const commonBtnStyle =
  "w-[220px] h-[160px] flex flex-col justify-center items-center border rounded-xl ";
const btnStyle =
  commonBtnStyle +
  "border-grayscale-10 text-grayscale-50 hover:border-primary-60 hover:bg-primary-5 hover:text-primary-60";
const clickedBtnStyle =
  commonBtnStyle + "border-primary-60 bg-primary-5 text-primary-60";
const textStyle = "text-lg mt-[12px]";

const methodList = [
  {
    type: "노트 만들기",
    body: (
      <>
        <Image src={note} alt="노트 강의 만들기" />
        <span className={textStyle}>노트 만들기</span>
      </>
    ),
  },
  {
    type: "영상 강의 만들기",
    body: (
      <>
        <Image src={video} alt="영상 강의 만들기" />
        <span className={textStyle}>영상 강의 만들기</span>
      </>
    ),
  },
  {
    type: "링크 만들기",
    body: (
      <>
        <Image src={link} alt="링크 강의 만들기" />
        <span className={textStyle}>링크 만들기</span>
      </>
    ),
  },
];

export default function CreateLectureMethod({ setMethod }: Props) {
  const [type, setType] = useState<string>("");

  const handleClick = (type: string) => setType(type);

  const onSubmitBtnClick = () => setMethod(type);

  return (
    <>
      <div className="flex justify-between mt-[26px]">
        {methodList.map(item => (
          <button
            type="button"
            className={`${type === item.type ? clickedBtnStyle : btnStyle}`}
            onClick={() => handleClick(item.type)}
            key={item.type}
          >
            {item.body}
          </button>
        ))}
      </div>
      <CreateLectureButton
        onClick={onSubmitBtnClick}
        disabled={type ? false : true}
      >
        다음
      </CreateLectureButton>
    </>
  );
}
