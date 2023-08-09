"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import mypage from "/public/images/mypage.svg";
import vector from "/public/images/vector.svg";
import pencil from "/public/images/pencil.svg";
import close from "/public/images/xbutton.svg";
import Sidebar from "./Button";
import Progress from "./Progress";
import { logoutUser } from "@/redux/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { logout } from "@/utils/sign";

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
    <div className="flex justify-center items-center w-[1024px]">
      <div className="flex mb-[100px] justify-center ">
        <div className="mr-[20px]">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1  ">
          <div className="flex flex-low justify-between mb-[30px]">
            <div className="flex flex-low ">
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
          <div className="h-[117px] border flex-col bg-blue-800 rounded-xl flex justify-between px-[28px] py-[24px] relative mb-[50px]">
            <div className=" relative">
              <span className="text-white">
                {userData?.username}
                <span className="text-gray-300">
                  님, 아직 제출하지 않은 과제가 있어요!
                </span>
                <div className="absolute top-[0px] right-[0px]">
                  <Image src={close} alt="닫기" />
                </div>
              </span>
            </div>
            <div className="flex">
              <span className="text-yellow-200 text-2xl font-bold mr-[13px]">
                10일차_6월 29일(수) 과제 제출
              </span>
              <span className="rounded-xl border block bg-white w-[63px] h-[24px] text-blue-800 font-bold text-lg text-center leading-6 mt-1">
                D-2
              </span>
            </div>
            <button
              className="text-white absolute bottom-[22px] right-[22px]"
              onClick={() => router.push("/community")}
            >
              과제방으로 가기
            </button>
          </div>
          <Progress></Progress>
        </div>
      </div>
    </div>
  );
}
