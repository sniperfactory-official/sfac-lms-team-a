"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import vector from "/public/images/vector.svg";
import pencil from "/public/images/pencil.svg";
import { logoutUser, updateProfileImage } from "@/redux/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { logout } from "@/utils/sign";
import { useProfileImage } from "@/hooks/reactQuery/mypage/useProfileImage";
import LoadingSpinner from "@/components/Loading/Loading";
import { Avatar } from "sfac-designkit-react";

export default function Profile() {
  const router = useRouter();
  const userId = useAppSelector(state => state.userInfo.id);
  const userProfile = useAppSelector(state => state.userInfo.profileImage);
  const dispatch = useAppDispatch();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  const upload = useRef<HTMLInputElement>(null);

  const { updateAndGetProfileImage } = useProfileImage(userId);
  const isUploading = updateAndGetProfileImage.isLoading;

  const handleImgClick = () => {
    if (upload.current && upload.current.files) {
      let file = upload.current.files[0];
      updateAndGetProfileImage.mutate(
        { file },
        {
          onSuccess: data => {
            dispatch(updateProfileImage(data));
          },
        },
      );
    }
  };

  const onLogout = async () => {
    try {
      logout();
      dispatch(logoutUser());
      router.push("/");
    } catch {
      alert("로그아웃 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className="flex items-center justify-between mb-[30px]">
      <div className="flex items-center justify-center">
        <div className="flex relative mr-[10px] items-center w-[68px] h-[68px]">
          {isUploading ? (
            <LoadingSpinner />
          ) : (
            <Avatar
              src={userProfile}
              alt="스나이퍼 팩토리 로고"
              size={68}
              className=" rounded-[50%] object-cover object-center h-[68px]"
            />
          )}
          <button className="absolute bottom-[0px] right-[0px]">
            <label htmlFor="file-uploader">
              <Image
                src={pencil}
                alt="수정버튼"
                width={20}
                height={20}
                priority={true}
                className=" cursor-pointer"
              />
            </label>
            <input
              id="file-uploader"
              type="file"
              accept="image/*"
              ref={upload}
              onChange={handleImgClick}
              style={{ display: "none" }}
            />
          </button>
        </div>
        <div>
          <div>
            <span className="mr-2 font-bold text-lg">{userData?.username}</span>
            <span>{userData?.role}</span>
          </div>
          <span className="text-gray-400">{userData?.email}</span>
        </div>
      </div>
      <button
        className="w-[115px] h-[35px] border bg-gray-100 rounded-md flex items-center justify-center"
        onClick={() => {
          onLogout();
        }}
      >
        <Image src={vector} alt="로그아웃 버튼" className="mr-2 " />
        <span className="text-gray-400">로그아웃</span>
      </button>
    </div>
  );
}
