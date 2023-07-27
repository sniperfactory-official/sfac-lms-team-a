"use client";

import ModalWrapper from "@/components/ModalWrapper";
import fetchPost from "@/hooks/reactQuery/useGetPostQuery";
import { useAppSelector } from "@/redux/store";
import LoadingSpinner from "@/components/Loading/Loading";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import PostButton from "@/components/common/PostButton";
import { useForm } from "react-hook-form";

interface FormValue {
  content: string;
}

export default function CommunityModal() {
  const postId = "YiJVx6OQBhlGGRCUj1WU";

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();

  const { data, isLoading, isError, error } = fetchPost(postId);
  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <ModalWrapper modalTitle="상세보기">
      <div className="border-solid border border-gray-200 rounded-xl p-4 my-6 text-sm">
        <div className="flex items-center">
          <Image src={avatar} alt="" className="w-10 h-10 mr-2" />

          <span className="text-blue-700">스나이퍼 팩토리</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">매니저</span>
          <div className="bg-gray-600 w-1 h-1 rounded mx-2"></div>
          <span className="text-gray-600">2023/06/28</span>
        </div>
        <h2 className="text-base font-bold my-2 ">{data.title}</h2>
        <div>
          <div className="mb-3">{data.content}</div>
          <div className="flex">
            {data.images?.map((img, idx) => (
              <>
                <Image
                  src={img}
                  alt="post 이미지"
                  className=" w-14 h-14 rounded-md mr-2 my-6"
                />
              </>
            ))}
          </div>
          <div className="">
            {data.tags?.map((tag, idx) => (
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

      <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 my-6 ">
        <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
        <div className=" w-full">
          <div className="flex items-center ">
            <div className="flex items-center flex-1">
              <span>김관우</span>
              <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
              <span className="text-gray-400">수강생</span>
            </div>

            <div className="flex divide-x-2 divide-gray text-sm">
              <div>
                <button className="mr-1">수정</button>
              </div>
              <div>
                <button className="ml-1">삭제</button>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between mt-1">
            <p className="text-base">이해가 잘 됩니다!</p>
            <span className="text-gray-400 text-sm">3일 전</span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-base border-solid border  border-gray-200 rounded-xl p-4 ">
        <div className=" w-full">
          <div className="flex items-center ">
            <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
            <div className="flex items-center flex-1">
              <span>김관우</span>
              <div className="bg-gray-400 w-1 h-1 rounded mx-2"></div>
              <span className="text-gray-400">수강생</span>
            </div>
          </div>
          <form
            className="flex w-full mt-1"
            onSubmit={handleSubmit(data => {
              data;
            })}
          >
            <input className="text-base flex-1 mr-4 px-1" />
            <PostButton text="업로드"></PostButton>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
