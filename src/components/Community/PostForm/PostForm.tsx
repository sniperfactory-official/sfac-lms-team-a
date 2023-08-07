"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import SelectMenu from "@/components/Community/PostForm/SelectMenu";
import PostTags from "@/components/Community/PostForm/PostTags";
import Button from "@/components/common/Button";
import ImageUploader, { ImageObject } from "@/components/common/ImageUploader";
import LoadingSpinner from "@/components/Loading/Loading";
import { useCreatePostMutation } from "@/hooks/reactQuery/community/useCreatePostMutation";
import { useUpdatePostMutation } from "@/hooks/reactQuery/community/useUpdatePostMutation";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";
import useGetSelectedPost from "@/hooks/reactQuery/useGetSelectedPost";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import uploadStorageImages from "@/utils/uploadStorageImages";
import deleteStorageImages from "@/utils/deleteStorageImages";
import imageCompress from "@/utils/imageCompress";
import { db } from "@/utils/firebase";
import { Timestamp, doc } from "firebase/firestore";
import { useAppSelector } from "@/redux/store";
import CATEGORY_DATA from "@/constants/category";

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
  // {File, url, status} 가 담긴 배열
  const [selectedImages, setSelectedImages] = useState<ImageObject[]>([]);
  const [icon, setIcon] = useState("");
  // 수정 시 기존 이미지/썸네일 배열
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

  const cleanup = () => {
    selectedImages
      .filter(item => item.status === "new")
      .map(item => URL.revokeObjectURL(item.url));
    setSelectedImages([]);
    onCleanup && onCleanup();
  };
  const getCurrentTime = Timestamp.now();

  const { mutate: postMutate, isLoading: postLoading } = useCreatePostMutation({
    onSuccess: () => {
      cleanup();
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdatePostMutation({
      onSuccess: () => {
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

  // 글 이미지 불러오기
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage(postedThumbnailImages);

  // 글을 디비에서 불러와서 나타낸다.
  useEffect(() => {
    if (!postLoading && postId && postedData) {
      setValue("title", postedData.title);
      setValue("content", postedData.content);
      setTagList(postedData.tags);
      setIcon(
        CATEGORY_DATA.filter(item => item.category === postedData.category)[0]
          ?.icon,
      );
      const isExistsImageData = selectedImages.some(
        item => imageData?.includes(item.url),
      );
      if (imageData && !isExistsImageData) {
        setPostedThumbnailImages(postedData.thumbnailImages);
        imageData.map(url => {
          const urlObject = new URL(url);
          const pathParts = urlObject.pathname.split("/");
          const fileRoot = pathParts[pathParts.length - 1].replaceAll(
            "%2F",
            "/",
          );
          setSelectedImages(prev => [
            ...prev,
            { url: url, status: "existing", root: fileRoot },
          ]);
        });
      }
    }
  }, [postId, postedData, imageData]);

  if (
    postLoading ||
    profileLoading ||
    postedLoading ||
    updateLoading ||
    imageLoading
  )
    return <LoadingSpinner />;

  const onSubmit = handleSubmit(async data => {
    const newImages = selectedImages.filter(item => item.status === "new");
    const deletedImages = selectedImages.filter(
      item => item.status === "deleted",
    );
    const existingImages = selectedImages.filter(
      item => item.status === "existing",
    );

    // 새로운 이미지 압축 & 스토리지 저장
    if (newImages.length) {
      const compressedImagesPromises = newImages.map(item =>
        imageCompress(item.file),
      );
      const compressedImagesArray = await Promise.all(compressedImagesPromises);
      const newThumbnailPaths = await uploadStorageImages(
        "thumbnailImages",
        compressedImagesArray,
      );
      const newPostImagePaths = await uploadStorageImages(
        "postImages",
        newImages.map(item => item.file),
      );
      submitImages.push(...newThumbnailPaths);
      submitThumbnailImages.push(...newPostImagePaths);
    }
    // 기존 이미지 경로에 담는 로직
    existingImages.forEach(item => {
      submitImages.push(item.root);
      submitThumbnailImages.push(
        item.root.replace("postImages", "thumbnailImages"),
      );
    });

    // 수정 시 삭제된 이미지 스토리지에서 제거

    const targetRoots = deletedImages
      .filter(item => postedThumbnailImages.includes(item.root))
      .map(item => item.root);

    // 기존 포스트에 있던 이미지 > 수정시 삭제된 이미지 : deleted
    if (targetRoots.length) {
      const targetThumbnailRoots = targetRoots.map(root =>
        root.replace("postImages", "thumbnailImages"),
      );
      deleteStorageImages(targetRoots); // posts/postImages
      deleteStorageImages(targetThumbnailRoots); // posts/ThumbnailImages
    }

    // 데이터들을 직접 formdata에 담아준다.
    data.tags = tagList;
    // 이미지가 없을 경우 | 모두 삭제된 경우
    if (postId && !newImages.length && !existingImages.length) {
      data.postImages = [];
      data.thumbnailImages = [];
    } else {
      data.postImages = submitImages;
      data.thumbnailImages = submitThumbnailImages;
    }

    // 게시글 등록 - 폼데이터를 파이어베이스에 저장한다.
    onClose();
    if (postId) {
      data.updatedAt = getCurrentTime;
      updateMutate({ data, postId });
    } else {
      data.createdAt = getCurrentTime;
      postMutate({ data, userRef });
    }
  });

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-[10px]">
        <div className="relative w-[34px] h-[34px] flex-shrink-0 mr-2 ">
          <Image
            src={profileData ?? "/images/avatar.svg"}
            alt="프로필 이미지"
            layout="fill"
            className="rounded-[50%] object-cover object-center"
          />
        </div>
        <p className="grayscale-60">{userName}</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-[10px]">
        <input
          id="title"
          placeholder="제목을 입력해주세요. (선택)"
          maxLength={15}
          {...register("title", { required: true })}
          className=" rounded-[8px] ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        />
        <div className="relative">
          <textarea
            className="w-full h-[300px] justify-center items-center rounded-[10px] border-grayscale-10 placeholder-grayscale-20 p-[15px] pb-12 resize-none ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            placeholder="내용을 입력해주세요."
            {...register("content", { required: true })}
          />
          <ImageUploader
            options="left-[40px]"
            options2="absolute start-[15px] bottom-[20px]"
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            postedThumbnailImages={postedThumbnailImages}
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
          <PostTags tagList={tagList} setTagList={setTagList} />
        </div>
        <Button
          text="업로드"
          isError={
            !titleValue || !contentValue || !selectedCategory ? true : false
          }
          disabled={
            isSubmitting || !titleValue || !contentValue || !selectedCategory
          }
          options={"w-[115px] h-[35px] self-end"}
        />
      </form>
    </div>
  );
}
