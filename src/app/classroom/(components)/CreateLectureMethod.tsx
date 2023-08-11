"use client";

import React, { useState } from "react";
import LectureButton from "./LectureButton";
import { Icon, Text } from "sfac-designkit-react";
import video from "/public/images/video.svg";
import Image from "next/image";

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

const methodList = [
  {
    type: "노트 만들기",
    body: (
      <>
        <Icon name="Note" width={60} height={60} />
        <Text size="lg" weight="medium" className="mt-[12px]">
          노트 만들기
        </Text>
      </>
    ),
  },
  {
    type: "영상 강의 만들기",
    body: (
      <>
        {/* <Icon name="Live" width={60} height={60}/> */}
        <Image src={video} alt="영상 강의 만들기" />
        <Text size="lg" weight="medium" className="mt-[12px]">
          영상 강의 만들기
        </Text>
      </>
    ),
  },
  {
    type: "링크 만들기",
    body: (
      <>
        <Icon name="Link" width={60} height={60} />
        <Text size="lg" weight="medium" className="mt-[12px]">
          링크 만들기
        </Text>
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
      <div className="flex w-[700px] justify-between mt-[26px]">
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
      <div className="mt-[24px] text-right">
        <LectureButton
          onClick={onSubmitBtnClick}
          disabled={type ? false : true}
        >
          다음
        </LectureButton>
      </div>
    </>
  );
}
