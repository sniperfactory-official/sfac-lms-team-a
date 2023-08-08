"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import vector from "/public/images/vector.svg";
import pencil from "/public/images/pencil.svg";
import Reminder from "@/components/Mypage/Reminder";
import Sidebar from "./(components)/Button";
import Progress from "./(components)/Progress";
import UserActivityList from "./(components)/UserActivityList";
import { logoutUser, updateProfileImage } from "@/redux/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import useGetProfileImage from "@/hooks/reactQuery/community/useGetProfileImage";
import useUpdateProfile from "@/hooks/reactQuery/community/useUpdateProfileImage";
import { logout } from "@/utils/sign";
import uploadStorageImages from "@/utils/uploadStorageImages";

export default function MyPage() {
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

  // 프로필 이미지
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileImage(userProfile);

  const upload = useRef<HTMLInputElement>(null);

  // upload
  const { mutate: updateMutate, error: updateError } = useUpdateProfile();
  const updateProfile = (userId: string, profileImage: string) => {
    if (updateError) {
      console.error(updateError);
      return;
    }
    updateMutate({
      userId: userId,
      // 1. 시간계산 필요, 업데이트 할 내용
      profileImage: profileImage,
    });
    dispatch(updateProfileImage(`users/${profileImage}`));
  };

  const handleImgClick = () => {
    if (upload.current && upload.current.files) {
      let fileList: FileList = upload.current.files;
      //FileList를 File[]로 변환
      let fileArray: File[] = Array.from(fileList);
      // 이후 fileArray를 사용하여 작업을 수행하세요.
      uploadStorageImages("users", fileArray);
      updateProfile(userId, fileArray[0].name);
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
    <div className="flex justify-center items-center ">
      <div className="w-9/12 flex mb-[100px] justify-center ">
        <div className="mr-[20px]">
          <Sidebar />
        </div>
        <div className="flex flex-col  w-9/12 ">
          <div className="flex items-center justify-between mb-[30px]">
            <div className="flex items-center justify-center">
              <div className="flex relative mr-[10px] items-center w-[68px] h-[68px]">
                <Image
                  src={profileData ?? "/images/avatar.svg"}
                  alt="스나이퍼 팩토리 로고"
                  width={43}
                  height={43}
                  className=" rounded-[50%] object-cover object-center"
                />
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
                  <span className="mr-2 font-bold text-lg">
                    {userData?.username}
                  </span>
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
          {userData && <Reminder userData={userData} userId={userId} />}
          <Progress />
          <UserActivityList />
        </div>
      </div>
    </div>
  );
}
