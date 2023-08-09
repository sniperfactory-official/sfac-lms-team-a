"use client";

import Reminder from "@/components/Mypage/Reminder";
import Sidebar from "./(components)/Button";
import Progress from "./(components)/Progress";
import Profile from "./(components)/Profile";
import UserActivityList from "./(components)/UserActivityList";
import { useAppSelector } from "@/redux/store";
import useGetUserQuery from "@/hooks/reactQuery/navbar/useGetUserQuery";

export default function MyPage() {
  const userId = useAppSelector(state => state.userInfo.id);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError,
  } = useGetUserQuery(userId);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-9/12 flex mb-[100px] justify-center ">
        <div className="mr-[20px]">
          <Sidebar />
        </div>
        <div className="flex flex-col  w-9/12 ">
          <Profile />
          <Reminder />
          <Progress />
          <UserActivityList />
        </div>
      </div>
    </div>
  );
}
