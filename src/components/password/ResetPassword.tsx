"use client";

import Image from "next/image";
import loginLogo from "/public/images/login.svg";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading/Loading";
import UserFetchUserInfo from "@/hooks/reactQuery/reset/useGetUserinfoQuery";

interface User {
  profileImage: string;
  email: string;
  role: string;
  createdAt: Date;
  username: string;
}

export default function ResetPassword() {
  const { data, isLoading, isError, error } = UserFetchUserInfo();

  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={loginLogo} alt="logo" priority={true} />
      <p className="text-center">
        비밀번호 초기화 링크를 전송했습니다. <br />
        스팸 메일함을 확인하세요.
      </p>
      <div className="w-[422px] flex flex-col gap-[30px]">
        <button
          className="h-[50px] px-[20px] py-[15px] rounded-[10px] bg-primary-80 text-white hover:opacity-60"
          onClick={() => {
            router.push("/");
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
