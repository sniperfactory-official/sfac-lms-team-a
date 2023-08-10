import Reminder from "@/app/mypage/(components)/Reminder";
import Sidebar from "./(components)/Button";
import Progress from "./(components)/Progress";
import Profile from "./(components)/Profile";
import UserActivityList from "./(components)/UserActivityList";

export default function MyPage() {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[1024px] flex mb-[100px] justify-center ">
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
