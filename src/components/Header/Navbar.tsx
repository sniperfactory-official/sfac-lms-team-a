"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "/public/images/avatar.svg";
import logo from "/public/images/logo.svg";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingSpinner from "@/components/Loading/Loading";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useLogoutMutation } from "@/hooks/reactQuery/logout/useLogoutQuery";
import { update } from "@/redux/userSlice";
import fetchUserInfo from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetLectureInfoQuery from "@/hooks/reactQuery/navbar/useGetLectureQuery";

export default function Navbar() {
  const router = useRouter();
  const userId = useAppSelector(state => state.userId.uid);
  const dispatch = useAppDispatch();
  const { mutateAsync } = useLogoutMutation();

  const onLogout = async () => {
    try {
      await mutateAsync();
      dispatch(update(""));
      setTimeout(() => purge(), 200);
    } catch {
      alert("로그아웃 실패했습니다. 다시 시도해주세요");
    }
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = fetchUserInfo(userId);

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    error: lectureFetchError,
  } = useGetLectureInfoQuery("FWj3XW7DwytoAOgoefUd");

  const getTime = (time: Date) => {
    const today = new Date();

    return Math.floor((today.getTime() - time.getTime()) / 1000 / 60 / 60 / 24);
  };

  const day = !lectureLoading && getTime(lectureData?.startDate.toDate());

  const purge = async () => {
    await persistor.purge();
    router.push("/");
  };

  if (userLoading && lectureLoading) {
    return <LoadingSpinner />;
  }

  if (userError && lectureError) {
    return (
      <span>
        Error: {((userFetchError || lectureFetchError) as Error).message}
      </span>
    );
  }

  return (
    <div>
      <div className="flex justify-center bg-blue-50 h-20 items-center">
        <div className="flex justify-between w-3/4">
          <div className="flex">
            <div className="">
              <Image
                src={avatar}
                alt="스나이퍼 팩토리 아바타"
                width={40}
                height={40}
                className="mr-2"
              />
            </div>
            <div className="flex items-center">
              <p>
                안녕하세요
                <span className="font-bold ml-1">{userData?.username}님</span>,
                강의
                <span className="font-bold ml-1">{day}일째</span>입니다.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={logo}
              alt="스나이퍼 팩토리 로고"
              width={56}
              height={32}
              className="mr-2"
            />
            <p>
              <span className="mr-1 text-blue-600 font-bold text-xl">
                FLUTTER
              </span>
              <span className="font-bold text-xl">부트캠프 3기</span>
            </p>
          </div>
          <div className="flex w-1/4 divide-x-2 divide-gray justify-end">
            <Link href={"/mypage/"} className="flex items-center">
              <button className="mr-2">마이페이지</button>
            </Link>
            <div className="flex">
              <button
                className="ml-2"
                onClick={() => {
                  onLogout();
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
