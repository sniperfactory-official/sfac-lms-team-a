'use client'
import Image from "next/image";
import React from "react";
import arrow from "/public/images/Arrow.svg";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import { useAppSelector } from "@/redux/store";

export default function Progress() {
  const userId = useAppSelector(state => state.userInfo.id);
  const arr = [1, 2, 3];

  const {
    data: progressData,
    isLoading: progressLoading,
    isError: progressError,
    error: progressFetchError,
  }
  = useGetProgressInfoQuery(userId);

  let percentage = 0;
  if (progressData && progressData.completedLectures && progressData.total) {
      percentage = Math.round((progressData.completedLectures / progressData.total) * 100);
  }


  return (
    <div className="">
      <h3 className="text-lg font-bold mb-[19px] ">강의 수강률</h3>
      <div className="w-full h-[30px] bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-[30px] bg-primary-50 rounded-full text-center text-blue-100 "
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
      <div className="grid grid-col-3 grid-flow-col gap-[16px]">
        <div className=" my-[50px] w-[245px] ">
          <div className="flex justify-between">
            <h3 className="font-bold ">제출한 과제</h3>
            <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
          </div>
          {arr.map(() => (
            <div className="h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
              <div className="flex">
                <div className="align-middle px-[5px] leading-5 text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
                  중
                </div>
                <h4 className=" text-sm">ListTitle 커스텀 위젯 만들기</h4>
              </div>
              <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                https://github.com/=2ahUKEwijlqnd-eT_AhVcl1YBHd23AdsQ0pQJegQIDBAB&biw=144....
              </p>
            </div>
          ))}
        </div>

        <div className=" my-[50px] w-[245px] ">
          <div className="flex justify-between">
            <h3 className="font-bold">나의 게시글</h3>
            <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
          </div>
          {arr.map(() => (
            <div className="  h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
              <div className="flex ">
                <div className=" leading-5 px-[2px] text-[10px] bg-gray-200 rounded mr-[7px] mb-[4px]">
                  질문있어요
                </div>
                <h4 className=" text-sm truncate ...">
                  ListTitle 커스텀 위젯 만들기
                </h4>
              </div>
              <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                https://github.com/=2ahUKEwijlqnd-eT_AhVcl1YBHd23AdsQ0pQJegQIDBAB&biw=144....
              </p>
            </div>
          ))}
        </div>

        <div className=" my-[50px] w-[245px] ">
          <div className="flex justify-between">
            <h3 className="font-bold">나의 댓글</h3>
            <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
          </div>
          {arr.map(() => (
            <div className="h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
              <div className="flex ">
                <div className="align-middle  w-[20px] leading-5 h-[20px] text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
                  중
                </div>
                <h4 className=" text-sm">ListTitle 커스텀 위젯 만들기</h4>
              </div>
              <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                https://github.com/=2ahUKEwijlqnd-eT_AhVcl1YBHd23AdsQ0pQJegQIDBAB&biw=144....
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
