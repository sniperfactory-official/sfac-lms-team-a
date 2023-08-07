"use client";
import Image from "next/image";
import React from "react";
import arrow from "/public/images/Arrow.svg";
import useGetProgressInfoQuery from "@/hooks/reactQuery/useGetProgressQuery";
import { useAppSelector } from "@/redux/store";
import useGetMyPosts from "@/hooks/reactQuery/mypage/useGetMyPosts";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetMyAssignments from "@/hooks/reactQuery/mypage/useGetMyAssignments";

export default function UserActivityList() {
  const userId = useAppSelector(state => state.userInfo.id);
  const arr = [1, 2, 3];
  // 유저 정보
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  const {
    data: myPostData,
    isLoading: myPostLoading,
    isError: myPostError,
    error: myPostFetchError,
  } = useGetMyPosts(userId);

  const {
    data: myAssignmentData,
    isLoading: myAssignmentLoading,
    isError: myAssignmentError,
    error: myAssignmentFetchError,
  } = useGetMyAssignments(userId);

  console.log(myAssignmentData);

  return (
    <>
      <div>
        <div className="flex flex-col ">
          <div className="">
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

          <div className="">
            <div className="flex justify-between">
              <h3 className="font-bold">나의 게시글</h3>
              <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
            </div>
            {myPostData
              ?.filter(el => el.category)
              .map(post => (
                <div className="  h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
                  <div className="flex ">
                    <div className=" leading-5 px-[2px] text-[10px] bg-gray-200 rounded mr-[7px] mb-[4px]">
                      {post.category}
                    </div>
                    <h4 className=" text-sm truncate ...">{post.title}</h4>
                  </div>
                  <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                    {post.content}
                  </p>
                </div>
              ))}
          </div>

          <div className="">
            <div className="flex justify-between">
              <h3 className="font-bold">나의 댓글</h3>
              <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
            </div>
            {myPostData
              ?.filter(el => !el.category)
              .map(post => (
                <div className="  h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
                  <div className="flex ">
                    <div className=" leading-5 px-[2px] text-[10px] bg-gray-200 rounded mr-[7px] mb-[4px]">
                      {post.parentData.category}
                    </div>
                    <h4 className=" text-sm truncate ...">
                      {post.parentData.title}
                    </h4>
                  </div>
                  <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                    {post.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
