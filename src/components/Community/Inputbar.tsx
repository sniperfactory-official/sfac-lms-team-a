"use client";

import { useState } from "react";
import Image from "next/image";
import inputAvatar from "/public/images/inputAvatar.svg";
import submitButton from "/public/images/submitButton.svg";

export default function Inputbar() {
  // const [modal, setModal] = useState(false);

  return (
    <div
      // onClick={() => setModal(true)}
      className="flex justify-center items-center w-[775px] pl-[10px] py-[10px] shadow-[1px_1px_10px_0_rgba(144,144,144,0.2)] rounded-[37px]"
    >
      <Image src={inputAvatar} alt="inputAvatar" className="ml-[10px]" />
      <div className="w-[684px] h-[43px] mx-5 pl-[30px] pr-[20px] flex justify-between items-center bg-[url('/images/inputMessage.svg')] bg-contain">
        <p className="text-grayscale-40">공유하고 싶은 생각이 있으신가요?</p>
        <Image src={submitButton} alt="submitButton" />
      </div>
    </div>
  );
}
