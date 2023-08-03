"use client";
import Image from "next/image";
import inputAvatar from "/public/images/inputAvatar.svg";
import { useForm } from "react-hook-form";
import SelectMenu from "@/components/Community/SelectMenu";
import Button from "@/components/common/Button";
import { KeyboardEvent, useState } from "react";
import ImageUploader, { ImageObject } from "@/components/common/ImageUploader";
import { usePostMutation } from "@/hooks/reactQuery/post/useCreatePostMutation";
import { uploadStorageImages } from "@/utils/uploadStorageImages";
import imageCompress from "@/utils/imageCompress";
import { Timestamp } from "firebase/firestore";
import LoadingSpinner from "@/components/Loading/Loading";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/redux/store";
import { doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FirebaseError } from "firebase/app";

type PostFormProps = {
  onClose: () => void;
  onCleanup: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
};
export interface PostValue {
  title: string;
  content: string;
  postImages: string[];
  thumbnailImages: string[];
  category: string;
  tags?: string[];
  createdAt: Timestamp;
}

export default function PostForm({ onClose, onCleanup }: PostFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<PostValue>();
  const titleValue = watch("title");
  const contentValue = watch("content");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>("");
  //File 자체들이 담긴 배열
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // {File, url}이 담긴 배열
  const [previewImages, setPreviewImages] = useState<ImageObject[]>([]);
  //압축된 이미지  배열
  const [compressedImages, setCompressedImages] = useState<File[]>([]);

  let submitImages: string[] = [];
  let submitThumbnailImages: string[] = []; // 폼데이터에 제출할 url들 담긴 배열

  const userId = useAppSelector(state => state.userInfo.id);
  const userRef = doc(db, "users", userId);
  const handleTagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.length > 0) {
      e.preventDefault();
      if (!tagList.includes(tagInputValue) && tagList.length < 5) {
        setTagList([...tagList, tagInputValue]);
      }
      setTagInputValue("");
    }
  };
  const getRoot = (targetArray: string[], originArray: File[]): void => {
    originArray.map(target =>
      targetArray.push(`posts/postImages/${target.name}`),
    );
  };
  const cleanup = () => {
    previewImages.map(item => URL.revokeObjectURL(item.url));
    setSelectedImages([]);
    setPreviewImages([]);
    setCompressedImages([]);
    console.log("clean!");
    onCleanup && onCleanup();
  };
  const getCurrentTime = Timestamp.now();

  const { mutate, isLoading } = usePostMutation({
    onSuccess: () => {
      onClose();
      cleanup();
    },
    onError: (error: FirebaseError) => {
      console.log("에러!! :: ", error);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-[10px]">
        <Image src={inputAvatar} alt="inputAvatar" />
        <p className="grayscale-60">캐서린</p>
      </div>
      <form
        onSubmit={handleSubmit(async data => {
          // 이미지를 압축한다
          await Promise.all(
            selectedImages.map(file =>
              imageCompress({ file, setCompressedImages }),
            ),
          );

          //경로에 맞게 배열에 경로를 포함한 파일루트를 담아준다.
          getRoot(submitImages, selectedImages);
          let copy = [...submitImages];
          submitThumbnailImages = copy.map(item =>
            item.replace("postImages", "thumbnailImages"),
          );

          // 데이터들을 직접 formdata에 담아준다.
          data.tags = tagList;
          data.postImages = submitImages;
          data.thumbnailImages = submitThumbnailImages;
          data.createdAt = getCurrentTime;

          // 이미지 & 압축 이미지를 스토리지에 저장한다.
          uploadStorageImages("postImages", selectedImages);
          uploadStorageImages("thumbnailImages", compressedImages);

          // 게시글 등록 - 폼데이터를 파이어베이스에 저장한다.
          mutate({ data, userRef });
        })}
        className="flex flex-col gap-[10px]"
      >
        <input
          id="title"
          placeholder="제목을 입력해주세요. (선택)"
          {...register("title", { required: true })}
          className=" rounded-[8px] ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        />
        <div className="relative">
          <textarea
            className="w-full h-[300px] justify-center items-center rounded-[10px] border-grayscale-10 placeholder-grayscale-20 p-[15px] resize-none ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            placeholder="내용을 입력해주세요."
            {...register("content", { required: true })}
          />
          <ImageUploader
            options="left-[40px]"
            options2="absolute start-[15px] bottom-[20px]"
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
          />
          <input {...register("postImages")} type="hidden" />
          <input {...register("thumbnailImages")} type="hidden" />
        </div>
        <div className="flex gap-2.5 items-center mt-2">
          <SelectMenu
            setSelectedCategory={setSelectedCategory}
            setValue={setValue}
          />
          <input
            id="category"
            {...register("category", { required: true })}
            value={selectedCategory}
            type="hidden"
          />
          <input
            id="tags"
            placeholder="# 태그 입력"
            onKeyPress={e => handleTagEnter(e)}
            maxLength={10}
            className="w-[102px] h-[40px] text-center placeholder-grayscale-40 bg-grayscale-5 rounded-[10px] ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            disabled={tagList.length === 5 ? true : false}
            onChange={e => setTagInputValue(e.target.value)}
            value={tagInputValue}
          />
          <div className="flex gap-1">
            {tagList.map(tag => (
              <div
                key={uuid()}
                className="flex justify-start items-center w-[70px] h-[35px] bg-grayscale-5 rounded-[10px] overflow-hidden"
              >
                <span className="text-grayscale-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button
          text="업로드"
          disabled={isSubmitting}
          isError={
            !titleValue || !contentValue || !selectedCategory ? true : false
          }
          options={"w-[115px] h-[35px] self-end"}
        />
      </form>
    </div>
  );
}
