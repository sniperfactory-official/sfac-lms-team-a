import React from "react";
import Image from "next/image";
import { Post } from "@/types/firebase.types";
import { Avatar } from "sfac-designkit-react";
import timestampToDate from "@/utils/timestampToDate";

interface PostCardProps {
  postData?: Post;
  imageData?: { name: string; url: string }[];
  handleModalOn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PostCard({
  postData,
  imageData,
  handleModalOn,
}: PostCardProps) {
  let date;
  // 데이터 있음 split 처리
  if (postData?.createdAt) {
    date = timestampToDate(postData.createdAt);
  }

  // 렌더링 중에 이미지정렬
  const sortedImageData = [...(imageData || [])].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="border-solid border border-gray-200 rounded-xl p-4 my-6 text-sm">
      <div className="flex items-center">
        <Avatar
          src={postData?.user?.profileImage ?? "/images/avatar.svg"}
          alt="프로필"
          size={43}
          ring={false}
          className="rounded-[50%] object-cover object-center h-[43px] mr-2"
        />
        <span className="text-blue-700">{postData?.user?.username}</span>
        <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
        <span className="text-gray-600">{postData?.user?.role}</span>
        <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
        <span className="text-gray-600">{date?.replaceAll(".", "/")}</span>
      </div>
      <h2 className="text-base font-bold my-2 ">{postData?.title}</h2>
      <div>
        <div className="mb-3 w-[710px]">{postData?.content}</div>
        <div className="flex">
          {sortedImageData.map((img, idx) => (
            <button key={idx} value={img.name} onClick={handleModalOn}>
              <Image
                src={img.url}
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
