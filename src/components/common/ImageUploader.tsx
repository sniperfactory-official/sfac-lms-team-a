import Image from "next/image";
import uploadIcon from "/public/images/upload.svg";
import { useRef } from "react";
import cancelIcon from "/public/images/cancel.svg";
import { v4 as uuidv4 } from "uuid";

interface ImageUploaderProps {
  options: string;
  options2: string;
  selectedImgs: string[];
  setSelectedImgs: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ImageUploader({
  options,
  options2,
  selectedImgs,
  setSelectedImgs,
}: ImageUploaderProps) {
  const upload = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    if (upload.current?.files?.[0]) {
      const url = URL.createObjectURL(upload.current.files[0]);
      setSelectedImgs(prev => [...prev, url]);
      console.log(selectedImgs);
    }
  };

  const deleteImg = (targetImg: string) => {
    setSelectedImgs(selectedImgs.filter(img => img !== targetImg));
  };

  return (
    <div className={`flex gap-[5px] ${options2}`}>
      <label
        htmlFor="file-uploader"
        className={`w-[63px] cursor-pointer ${options}`}
      >
        <Image src={uploadIcon} alt="upload-image" priority={true} />
      </label>
      <input
        id="file-uploader"
        type="file"
        accept="image/*"
        ref={upload}
        onChange={handleImgClick}
        multiple={true}
        style={{ display: "none" }}
        disabled={selectedImgs.length === 5 ? true : false}
      />
      <div className="flex gap-[5px]">
        {selectedImgs.map(img => (
          <div className="relative" key={uuidv4()}>
            <img
              src={img}
              alt="selectedImg"
              className="w-[63px] h-[61px] rounded-[10px]"
            />
            <Image
              src={cancelIcon}
              onClick={() => deleteImg(img)}
              alt="cancelIcon"
              className="absolute top-[2px] right-[2px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
