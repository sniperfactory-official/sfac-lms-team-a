import React from "react";
import Image from "next/image";
import clip from "/public/images/clip.svg";

interface props {
  name: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileItem({ name, setFiles }: props) {
  const onClickHandler = () => {
    setFiles(current => current.filter(value => value.name !== name));
  };

  return (
    <li className="w-[690px] h-[50px] flex justify-between items-center text-primary-80">
      <p className="text-[16px] flex items-center font-bold truncate">
        <Image src={clip} alt="" className="mr-[12px]" />
        {name}
      </p>
      <button
        type="button"
        onClick={onClickHandler}
        className="text-grayscale-100 text-[12px] w-[30px] ml-[40px]"
      >
        삭제
      </button>
    </li>
  );
}
