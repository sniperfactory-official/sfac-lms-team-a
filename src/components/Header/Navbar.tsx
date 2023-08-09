"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/logo.svg";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading/Loading";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/userSlice";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetLectureInfoQuery from "@/hooks/reactQuery/navbar/useGetLectureQuery";
import { logout } from "@/utils/sign";

export default function Navbar() {
  const router = useRouter();
  const userId = useAppSelector(state => state.userInfo.id);
  const user = useAppSelector(state => state.userInfo);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    try {
      logout();
      dispatch(logoutUser());
      router.push("/");
    } catch {
      alert("로그아웃 실패했습니다. 다시 시도해주세요");
    }
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    error: lectureFetchError,
  } = useGetLectureInfoQuery("01ZGWkepm08s3Cgt83bG");

  const getTime = (time: Date) => {
    const today = new Date();

    return Math.floor((today.getTime() - time.getTime()) / 1000 / 60 / 60 / 24);
  };
  const day = !lectureLoading && getTime(lectureData?.startDate.toDate());

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
      <div className="fixed top-0 z-50 w-full">
        <div className="flex justify-center bg-blue-50 h-[60px] items-center">
          <div className="flex justify-between w-3/4">
            <div className="flex">
              <div className="w-[40px] h-[40px] relative mr-2">
                <Image
                  src={user.profileImage ?? "/images/avatar.svg"}
                  alt="프로필"
                  width={43}
                  height={43}
                  className="rounded-[50%] object-cover object-center"
                />
              </div>
              <div className="flex items-center text-base">
                <p>
                  안녕하세요
                  <span className="font-bold ml-1">{user.username}님</span>,
                  강의
                  <span className="font-bold ml-1">{day}일째</span>입니다.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center ml-[9.5%]">
              <Image
                src={logo}
                alt="스나이퍼 팩토리 로고"
                width={48}
                height={25}
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
    </div>
  );
}
