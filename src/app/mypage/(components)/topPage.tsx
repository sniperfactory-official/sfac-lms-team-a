"use client";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import Image from "next/image";
import { useLogoutMutation } from "@/hooks/reactQuery/logout/useLogoutMutation";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/userSlice";
import mypage from "/public/images/mypage.svg";
import { persistor } from "@/redux/store";
import Button from "./Button";
import vector from "/public/images/vector.svg";
import pencil from "/public/images/pencil.svg";
import close from "/public/images/xbutton.svg";

export default function TopPage() {
  const router = useRouter();
  const userId = useAppSelector(state => state.userInfo.id);
  const dispatch = useAppDispatch();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  const { mutateAsync } = useLogoutMutation();

  const onLogout = async () => {
    try {
      await mutateAsync();
      dispatch(logoutUser());
      setTimeout(() => purge(), 200);
    } catch {
      alert("로그아웃 실패했습니다. 다시 시도해주세요");
    }
  };

  const purge = async () => {
    await persistor.purge();
    router.push("/");
  };

  return (
    <div className="flex justify-center mt-[50px] mb-[100px]">
      <div className="flex-row w-9/12">
        <div className="flex">
          <div className="flex flex-col mt-3">
            <Button type="main" category="마이페이지" />
            <Button type="sub" category="전체" />
          </div>
          <div className="flex justify-between items-center flex-1 ml-5">
            <div className="flex">
              <div className="flex relative">
                <Image
                  src={mypage}
                  alt="스나이퍼 팩토리 로고"
                  width={68}
                  height={68}
                  className="mr-2"
                />
                <button className="absolute bottom-[13px] right-[10px]">
                  <Image src={pencil} alt="수정버튼" width={20} height={20} />
                </button>
              </div>
              <div className="flex justify-start items-center">
                <div className="flex flex-col justify-center w-[121px] h-[45px]">
                  <div>
                    <span className="mr-2 font-bold text-lg">
                      {userData?.username}
                    </span>
                    <span>{userData?.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">{userData?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="w-[115px] h-[35px] border bg-gray-100 rounded-md"
                onClick={() => {
                  onLogout();
                }}
              >
                <div className="flex justify-center">
                  <Image src={vector} alt="로그아웃 버튼" className="mr-2" />
                  <span className="text-gray-400">로그아웃</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end relative">
          <div className="w-[845px] h-[117px] border bg-blue-800 rounded-xl flex items-center pl-5 justify-between">
            <div className="flex flex-col items-start">
              <span className="text-white">
                {userData?.username}
                <span className="text-gray-300">
                  님, 아직 제출하지 않은 과제가 있어요!
                </span>
              </span>
              <div className="flex">
                <span className="text-yellow-200 text-2xl font-bold">
                  10일차_6월 29일(수) 과제 제출
                </span>
                <div className="flex items-center">
                  <span className="ml-3 rounded-xl border bg-white w-[63px] h-[24px] flex justify-center">
                    <span className="text-blue-800 font-bold text-lg flex items-center mt-1">
                      D-2
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-[30px] right-[30px]">
              <Image src={close} alt="닫기" />
            </div>
            <div className="self-end mb-4 mr-[25px] text-sm">
              <button
                className="text-white"
                onClick={() => router.push("/community")}
              >
                과제방으로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
