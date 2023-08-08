import React from "react";
import Image from "next/image";
import useGetPostImage from "@/hooks/reactQuery/community/useGetPostImage";
import LoadingSpinner from "../Loading/Loading";

interface ImageModalProps {
  props: string;
  handleModalOn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ImageModal({ props, handleModalOn }: ImageModalProps) {
  const handleBubbling = (e: React.MouseEvent) => e.stopPropagation();

  // 글 이미지
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
    error: imageFetchError,
  } = useGetPostImage([props.replace("thumbnailImages", "postImages")]);

  if (imageLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="fixed z-10 inset-0 bg-black opacity-20" />
      <button
        onClick={handleModalOn}
        className="fixed z-20 inset-0 flex overscroll-none overflow-y-auto p-[35px] cursor-default"
      >
        <div
          className="m-auto relative w-[500px] min-h-[500px] border-2 shadow-md bg-white rounded-lg p-6"
          onClick={handleBubbling}
        >
          {imageData && (
            <Image src={imageData[0].url} alt="" width={500} height={500} />
          )}
        </div>
      </button>
    </>
  );
}
