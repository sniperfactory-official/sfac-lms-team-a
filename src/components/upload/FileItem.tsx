import React from "react";
import Image from "next/image";
import clip from "/public/images/clip.svg";

interface Props {
  file: File;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileItem({ file, setFiles }: Props) {
  const onClickHandler = () => {
    setFiles(current => current.filter(value => value.name !== file.name));
  };

  const handleDownload = () => {
    const fileURL = URL.createObjectURL(file);

    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = file.name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <li className="w-[690px] h-[50px] flex justify-between items-center text-primary-80">
      <p
        className="text-[16px] flex items-center font-bold truncate cursor-pointer"
        onClick={handleDownload}
      >
        <Image src={clip} alt="" className="mr-[12px]" />
        {file.name}
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
