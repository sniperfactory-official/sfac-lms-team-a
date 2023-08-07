"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { KeyboardEvent, useState, useEffect } from "react";
import SelectMenu from "@/components/Community/PostForm/SelectMenu";
import Button from "@/components/common/Button";
import ImageUploader, { ImageObject } from "@/components/common/ImageUploader";
import LoadingSpinner from "@/components/Loading/Loading";
import { useCreatePostMutation } from "@/hooks/reactQuery/community/useCreatePostMutation";
import { useUpdatePostMutation } from "@/hooks/reactQuery/community/useUpdatePostMutation";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import { uploadStorageImages } from "@/utils/uploadStorageImages";
import imageCompress from "@/utils/imageCompress";
import { db } from "@/utils/firebase";
import { Timestamp, doc } from "firebase/firestore";
import { useAppSelector } from "@/redux/store";
import CATEGORY_DATA from "@/constants/category";
import { v4 as uuid } from "uuid";

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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
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
  //{File, url} 자체들이 담긴 배열
  const [selectedImages, setSelectedImages] = useState<ImageObject[]>([]);
  // url이 담긴 배열
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  //압축된 이미지  배열
  const [compressedImages, setCompressedImages] = useState<File[]>([]);
  const [icon, setIcon] = useState("");
  // 수정 시 기존 썸네일 배열
  const [postedThumbnailImages, setPostedThumbnailImages] = useState<string[]>(
    [],
  );
  let submitImages: string[] = [];
  let submitThumbnailImages: string[] = []; // 폼데이터에 제출할 url들 담긴 배열

  const userId = useAppSelector(state => state.userInfo.id);
  const userProfile = useAppSelector(state => state.userInfo.profileImage);
  const userName = useAppSelector(state => state.userInfo.username);
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileImage(userProfile);

  const userRef = doc(db, "users", userId);

  const handleTagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.length > 0) {
      e.preventDefault();
      console.log(tagList, tagInputValue);
      if (!tagList.includes(tagInputValue) && tagList.length < 5) {
        setTagList([...tagList, tagInputValue]);
      }
      setTagInputValue("");
    }
  };
  const getRoot = (targetArray: string[], originArray: ImageObject[]): void => {
    originArray.map(target =>
      targetArray.push(`posts/postImages/${target.file.name}`),
    );
  };
  const cleanup = () => {
    previewImages.map(item => URL.revokeObjectURL(item));
    setSelectedImages([]);
    setPreviewImages([]);
    setCompressedImages([]);
    console.log("clean!");
    onCleanup && onCleanup();
  };
  const getCurrentTime = Timestamp.now();

  const { mutate: postMutate, isLoading: postLoading } = useCreatePostMutation({
    onSuccess: () => {
      onClose();
      cleanup();
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdatePostMutation({
      onSuccess: () => {
        onClose();
        cleanup();
      },
    });
  // 수정하기 로직
  const postId = useAppSelector(state => state.postInfo.postId);
  const {
    data: postedData,
    isLoading: postedLoading,
    isError: postedError,
    error: postedFetchError,
  } = useGetSelectedPost(postId);

  // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage(postedThumbnailImages);

  // 글을 디비에서 불러와서 나타낸다.
  useEffect(() => {
    console.log("postedData:: ", postedData);
    if (!postLoading && postId && postedData) {
      setValue("title", postedData.title);
      setValue("content", postedData.content);
      setTagList(postedData.tags);

      setIcon(
        CATEGORY_DATA.filter(item => item.category === postedData.category)[0]
          .icon,
      );

      if (postedData.thumbnailImages) {
        setPostedThumbnailImages(postedData.thumbnailImages);
        setPreviewImages(prev => [...prev, ...postedThumbnailImages]);
        console.log(postedThumbnailImages);
      }
    }
  }, [postId]);

  //이미지 불러와서 나타내기

  if (postLoading || profileLoading || postedLoading || updateLoading)
    return <LoadingSpinner />;

  const onSubmit = handleSubmit(async data => {
    // 이미지를 압축한다
    console.log("selectedImages", selectedImages);
    await Promise.all(
      selectedImages.map(item =>
        imageCompress({ file: item.file, setCompressedImages }),
      ),
    );
    console.log("압축된 이미지배열", compressedImages);

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

    // 이미지 & 압축 이미지를 스토리지에 저장한다.
    uploadStorageImages("thumbnailImages", compressedImages);
    uploadStorageImages(
      "postImages",
      selectedImages.map(imageObject => imageObject.file),
    );

    // 게시글 등록 - 폼데이터를 파이어베이스에 저장한다.
    if (postId) {
      // update
      data.updatedAt = getCurrentTime;
      updateMutate({ data, postId });
    } else {
      // post
      data.createdAt = getCurrentTime;
      postMutate({ data, userRef });
    }
  });

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-[10px]">
        <Image
          src={profileData ?? "/images/avatar.svg"}
          width={34}
          height={34}
          alt="프로필 이미지"
          className="mr-2 rounded-[50%]"
        />
        <p className="grayscale-60">{userName}</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-[10px]">
        <input
          id="title"
          placeholder="제목을 입력해주세요. (선택)"
          {...register("title", { required: true })}
          maxLength = {15}
          className=" rounded-[8px] ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        />
        <div className="relative">
          <textarea
            className="w-full h-[300px] justify-center items-center rounded-[10px] border-grayscale-10 placeholder-grayscale-20 p-[15px] resize-none ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            placeholder="내용을 입력해주세요."
            maxLength = {600}
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
            initialCategory={
              postId ? [icon, postedData?.category] : ["", "주제"]
            }
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
            disabled={tagList?.length === 5 ? true : false}
            onChange={e => setTagInputValue(e.target.value)}
            value={tagInputValue}
          />
          <div className="flex gap-1">
            {tagList?.map(tag => (
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
