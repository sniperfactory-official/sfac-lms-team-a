import Image from "next/image";
import uploadIcon from "/public/images/upload.svg";
import { useRef, useState, useEffect } from "react";
import cancelIcon from "/public/images/cancel.svg";

export interface ImageObject {
  file?: File;
  url: string;
  status: "new" | "existing" | "deleted";
  root: string;
}

interface ImageUploaderProps {
  options: string;
  options2: string;
  selectedImages: ImageObject[];
  setSelectedImages: React.Dispatch<React.SetStateAction<ImageObject[]>>;
  postedThumbnailImages: string[];
}

export default function ImageUploader({
  options,
  options2,
  selectedImages,
  setSelectedImages,
  postedThumbnailImages,
}: ImageUploaderProps) {
  const upload = useRef<HTMLInputElement>(null);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const activeImagesCount = selectedImages.filter(
    item => item.status !== "deleted",
  ).length;

  const handleImgClick = () => {
    if (upload.current?.files?.[0]) {
      const chosenFiles = Array.from(upload.current.files);
      // 수정 시 - 기존 제출된 이미지인 경우
      const fileName = upload.current?.files?.[0]?.name;
      const isPostedImage = fileName
        ? postedThumbnailImages.some(postedUrl => postedUrl.includes(fileName))
        : false;
      // 이미 선택된 이미지인 경우
      const isAlreadySelected = chosenFiles.some(file =>
        selectedImages.some(
          item => item.file?.name === file.name && item.status !== "deleted",
        ),
      );
      // 동시에 같은 이미지를 클릭한 경우
      const hasDuplicateFiles =
        chosenFiles.length !== new Set(chosenFiles.map(file => file.name)).size;

      if (hasDuplicateFiles || isPostedImage) {
        alert("중복된 이미지는 업로드 할 수 없습니다.");
        return;
      } else if (isAlreadySelected) {
        alert("이미 선택한 이미지입니다.");
        return;
      } else if (chosenFiles.length + activeImagesCount > 5) {
        alert("이미지는 다섯개까지 올릴 수 있습니다.");
      } else {
        const newImages: ImageObject[] = chosenFiles.map(file => {
          const url = URL.createObjectURL(file);
          return {
            file: file,
            url: url,
            status: "new",
            root: `posts/postImages/${file.name}`,
          };
        });
        setSelectedImages(prev => [...prev, ...newImages]);
        setTriggerEffect(prev => !prev);
      }
    }
  };

  const deleteImg = (target: string) => {
    setSelectedImages(prev =>
      prev.map(item =>
        item.url === target ? { ...item, status: "deleted" } : item,
      ),
    );
    setTriggerEffect(prev => !prev);
  };

  useEffect(() => {
    const sortedImages = [...selectedImages].sort((a, b) => {
      if (a.root < b.root) return -1;
      if (a.root > b.root) return 1;
      return 0;
    });
    setSelectedImages(sortedImages);
  }, [triggerEffect]);

  return (
    <div className={`flex gap-[5px] ${options2}`}>
      <label
        htmlFor="file-uploader"
        className={`w-[63px] ${
          activeImagesCount >= 5 ? "" : "cursor-pointer"
        } ${options}`}
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
        disabled={activeImagesCount >= 5}
      />
      <div className="flex gap-[5px]">
        {selectedImages
          .filter(item => item.status !== "deleted")
          .map(item => (
            <div className="relative" key={item.root}>
              <img
                src={item.url}
                alt="selectedImg"
                className="w-[63px] h-[61px] rounded-[10px]"
              />
              <Image
                src={cancelIcon}
                onClick={() => deleteImg(item.url)}
                alt="cancelIcon"
                className="absolute top-[2px] right-[2px]"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
