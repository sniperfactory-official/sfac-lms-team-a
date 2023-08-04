"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface AssignmentSubmitModalProps {
  handleModalState: () => void;
}

const AssignmentLinkSubmitModal = ({
  handleModalState,
}: AssignmentSubmitModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const addLink = () => {
    if (links.length >= 5)
      return window.alert("링크는 최대 5개까지 입력 가능합니다.");

    if (!inputValue.trim().length) return;

    if (links.includes(inputValue.trim()))
      return window.alert("이미 입력된 링크입니다.");

    const regex =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (regex.test(inputValue)) {
      setLinks([...links, inputValue]);
      setInputValue("");
    } else {
      window.alert("유효한 URL이 아닙니다. 다시 시도해주세요.");
    }
  };

  const handleLinkdelete = (idx: number) => {
    const newLinks = links.filter((link, linkIdx) => linkIdx !== idx);
    setLinks(newLinks);
  };

  const handleSubmit = () => {
    if (inputValue.trim().length) return console.log([...links, inputValue]);
    console.log(links);
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-6">과제 제출</h1>
      <div className="flex flex-col gap-2 mb-4">
        {links.length
          ? links.map((link, idx) => (
              <div className="relative w-full border border-grayscale-10 rounded-[10px] placeholder:text-grayscale-20 p-2">
                <Link href={link} target="_blank">
                  {link}
                </Link>
                <button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    handleLinkdelete(idx);
                  }}
                  className="absolute top-[13px] right-[15px] text-xs"
                >
                  삭제
                </button>
              </div>
            ))
          : null}
        {links.length < 5 && (
          <div className="relative">
            <input
              className="w-full border border-grayscale-10 rounded-[10px] placeholder:text-grayscale-20 p-2"
              placeholder="https://"
              value={inputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
            />
            <button
              onClick={() => {}}
              className="absolute top-[13px] right-[15px] text-xs"
            >
              삭제
            </button>
          </div>
        )}
        <button
          className="w-full flex items-center gap-[10px] text-grayscale-20 border border-grayscale-10 rounded-[10px] p-2"
          onClick={addLink}
        >
          <Image
            src="/images/add.svg"
            alt="추가"
            width={21.87}
            height={21.88}
          />
          <span>링크 추가하기</span>
        </button>
      </div>
      <div className="w-full flex justify-end gap-2">
        <button
          className="text-center bg-grayscale-5 font-bold text-grayscale-60 w-[115px] h-[35px] rounded-[7px]"
          onClick={handleModalState}
        >
          취소
        </button>
        <button
          className="text-center bg-primary-80 font-bold text-white w-[115px] h-[35px] rounded-[7px]"
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AssignmentLinkSubmitModal;
