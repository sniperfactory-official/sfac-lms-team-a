import Image from "next/image";
import uploadIcon from "/public/images/upload.svg";
import { useRef } from "react";
import cancelIcon from "/public/images/cancel.svg";
import { v4 as uuidv4 } from "uuid";

interface ImageUploaderProps {
  options: string;
  options2: string;
  selectedImgs: File[];
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImgs: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({
  options,
  options2,
  selectedImgs,
  previewImages,
  setPreviewImages,
  setSelectedImgs,
}: ImageUploaderProps) {
  const upload = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    if (upload.current?.files?.[0]) {
      const url = upload.current.files[0];
      const previewImage = URL.createObjectURL(upload.current.files[0]);
      // console.log(url)
      console.log(previewImages);
      setPreviewImages(prev => [...prev, previewImage]);
      setSelectedImgs(prev => [...prev, url]);
      // console.log(selectedImgs);
    }
  };

  const deleteImg = (targetFileName: string) => {
    setPreviewImages(previewImages.filter(file => file !== targetFileName));
  };

  return (
    <div className={`flex gap-[5px] ${options2}`}>
      <label
        htmlFor="file-uploader"
        className={`w-[63px] cursor-pointer ${options}`}
      >
        <Image
          src={uploadIcon}
          alt="upload-image"
          priority={true}
          width={63}
          height={61}
        />
      </label>
      <input
        id="file-uploader"
        type="file"
        accept="image/*"
        ref={upload}
        onChange={handleImgClick}
        multiple
        style={{ display: "none" }}
        disabled={selectedImgs.length === 5 ? true : false}
      />
      <div className="flex gap-[5px]">
        {previewImages.map(file => (
          <div className="relative" key={uuidv4()}>
            <img
              src={file}
              alt="selectedImg"
              className="w-[63px] h-[61px] rounded-[10px]"
            />
            <Image
              src={cancelIcon}
              onClick={() => deleteImg(file)}
              alt="cancelIcon"
              className="absolute top-[2px] right-[2px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
