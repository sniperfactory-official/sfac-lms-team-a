"use client";

import Image from "next/image";
import submitButton from "/public/images/submitButton.svg";
import { useEffect, useState } from "react";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";
import { useAppSelector } from "@/redux/store";
import LoadingSpinner from "@/components/Loading/Loading";

type InputbarProps = {
  handleClick: () => void;
};

export default function Inputbar({
  handleClick,
}: InputbarProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);
  const userProfile = useAppSelector(state => state.userInfo.profileImage);

  // 프로필 이미지
  const {
    data: profileData,
    isLoading: profileLoading,
  } = useGetProfileImage(userProfile);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer); // 이벤트 리스너 제거 시 타이머도 제거
    };
  }, []);

  if (profileLoading) {
    return <LoadingSpinner />;
  }

  return isVisible ? (
    <div
      className={`
        flex justify-center items-center w-[775px] mt-[500px] pl-[10px] py-[10px] shadow-[1px_1px_10px_0_rgba(144,144,144,0.2)] rounded-[37px]
        fixed bottom-[20%] left-[35%] cursor-pointer
        bg-white
        transition-all duration-700 ease-in-out
        ${
          isVisible
            ? "transform translateY(0) opacity-100"
            : "transform translateY(100%) opacity-0"
        }
        animate-bounce
      `}
      onClick={handleClick}
    >
      <div className="w-[47px] h-[47px] relative ml-[10px] ">
        <Image
          src={profileData ?? "/images/avatar.svg"}
          alt="프로필"
          width={100}
          height={100}
          className="rounded-[50%] object-cover object-center"
        />
      </div>
      <div
        className="
        w-[684px] h-[43px] mx-5 pl-[30px] pr-[20px] flex justify-between items-center bg-[url('/images/inputMessage.svg')] bg-contain"
      >
        <p className="text-grayscale-40">공유하고 싶은 생각이 있으신가요?</p>
        <Image src={submitButton} alt="submitButton" />
      </div>
    </div>
  ) : null;
}
