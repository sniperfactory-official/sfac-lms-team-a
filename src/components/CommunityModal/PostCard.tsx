import React from "react";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import { Post } from "@/types/firebase.types";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";

interface PostCardProps {
  postData: Post;
  imageData: string[];
  handleModalOn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PostCard({
  postData,
  imageData,
  handleModalOn,
}: PostCardProps) {
  const date = postData?.createdAt.toDate().toISOString().split("-");

  // 프로필 이미지
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileImage(postData.user?.profileImage);

  return (
    <div className="border-solid border border-gray-200 rounded-xl p-4 my-6 text-sm">
      <div className="flex items-center">
        <div className="w-[43px] h-[43px] relative flex-shrink-0 mr-2">
          <Image
            src={profileData ?? "/images/avatar.svg"}
            alt="프로필"
            layout="fill"
            className=" rounded-[50%] object-cover object-center"
          />
        </div>
        <span className="text-blue-700">{postData?.user?.username}</span>
        <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
        <span className="text-gray-600">{postData?.user?.role}</span>
        <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
        <span className="text-gray-600">{`${date[0]}/${date[1]}/${date[2].slice(
          0,
          2,
        )}`}</span>
      </div>
      <h2 className="text-base font-bold my-2 ">{postData?.title}</h2>
      <div>
        <div className="mb-3 w-[710px]">{postData?.content}</div>
        <div className="flex">
          {imageData?.map((img, idx) => (
            <button value={img} onClick={handleModalOn}>
              <Image
                key={idx}
                src={img}
                width={30}
                height={30}
                alt="post 이미지"
                className=" w-14 h-14 rounded-md mr-2 my-6"
              />
            </button>
          ))}
        </div>
        <div className="">
          {postData?.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-xs py-1 px-2 mr-2 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
