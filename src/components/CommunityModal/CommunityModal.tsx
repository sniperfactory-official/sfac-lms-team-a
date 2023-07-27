"use client";

import ModalWrapper from "@/components/ModalWrapper";
import fetchPost from "@/hooks/reactQuery/useGetPostQuery";
import { useAppSelector } from "@/redux/store";
import LoadingSpinner from "@/components/Loading/Loading";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";

export default function CommunityModal() {
  const postId = "YiJVx6OQBhlGGRCUj1WU";

  const { data, isLoading, isError, error } = fetchPost(postId);
  console.log(data);
  const imgArr = [1, 2, 3];
  const tagArr = [1, 2, 3];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <ModalWrapper modalTitle="상세보기">
      <div className="border-solid border-2  border-gray-200 rounded-xl p-4 my-6 text-sm">
        <div className="flex items-center">
          <Image src={avatar} alt="" className="w-10 h-10 mr-2" />

          <span className="text-blue-700">스나이퍼 팩토리</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">매니저</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">2023/06/28</span>
        </div>
        <h2 className="text-base font-bold my-2 ">
          Lorem Ipsum is simply dummy text of the printing
        </h2>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining...
          <div className="grid">
            {imgArr.map((img, idx) => (
              <Image />
            ))}
          </div>
          <div className="inline-grid grid-cols-3 gap-3">
            {tagArr.map((tag, idx) => (
              <span className="bg-gray-100 text-xs py-1 px-2 rounded">
                태그
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center text-lg">
        <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
        <div>
          <div className="flex items-center">
            <span>김관우</span>
            <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
            <span className="text-gray-400">수강생</span>
            <div className="flex divide-x-2 divide-gray text-sm">
              <div>
                <button className="mr-1">수정</button>
              </div>
              <div>
                <button className="ml-1">삭제</button>
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="text-base">이해가 잘 됩니다!</p>
            <span className="text-gray-400 text-sm">3일 전</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
