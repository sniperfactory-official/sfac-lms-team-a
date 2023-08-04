"use client";

import Image from "next/image";
import inputAvatar from "/public/images/inputAvatar.svg";
import submitButton from "/public/images/submitButton.svg";
import { useEffect, useState } from 'react';

type InputbarProps = {
  onClick: () => void;
}

export default function Inputbar({ onClick }: InputbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer); // 이벤트 리스너 제거 시 타이머도 제거
    };
  }, []);

  return (
    isVisible &&
    <div
      className={`
      flex justify-center items-center w-[775px] mt-[500px] pl-[10px] py-[10px] shadow-[1px_1px_10px_0_rgba(144,144,144,0.2)] rounded-[37px]
      fixed bottom-[20%] left-[35%] cursor-pointer 
      transition-all duration-500
      ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      onClick={onClick}
    >
      <Image src={inputAvatar} alt="inputAvatar" className="ml-[10px]" />
      <div className="w-[684px] h-[43px] mx-5 pl-[30px] pr-[20px] flex justify-between items-center bg-[url('/images/inputMessage.svg')] bg-contain">
        <p className="text-grayscale-40">공유하고 싶은 생각이 있으신가요?</p>
        <Image src={submitButton} alt="submitButton" />
      </div>
    </div >
  );
}
