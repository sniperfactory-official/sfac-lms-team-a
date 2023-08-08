import React, { useState } from "react";
import useGetLectureInfoQuery from "@/hooks/reactQuery/lecture/useGetLectureInfoQuery";
import { useGetAssignmentsByUser } from "@/hooks/reactQuery/mypage/useGetAssignmentsByUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DocumentReference, Timestamp } from "@firebase/firestore";

type UserDataType = {
  userRef: DocumentReference;
  profileImage?: string;
  email: string;
  role: string;
  username?: string;
  createdAt?: Timestamp;
};

interface ReminderProps {
  userData: UserDataType;
  userId: string;
}

const Reminder: React.FC<ReminderProps> = ({ userData, userId }) => {
  const router = useRouter();
  const [isReminderVisible, setIsReminderVisible] = useState(true);

  // 일차 가져오기
  const { data: lectureData, isLoading: lectureLoading } =
    useGetLectureInfoQuery("01ZGWkepm08s3Cgt83bG");

  const getTime = (time: Date) => {
    const today = new Date();
    return Math.floor((today.getTime() - time.getTime()) / 1000 / 60 / 60 / 24);
  };

  const dayFromNow =
    !lectureLoading && lectureData?.startDate?.toDate()
      ? getTime(lectureData.startDate.toDate())
      : undefined;

  //  제출하지 않은 과제 가져오기
  const { data: assignmentsData } = useGetAssignmentsByUser(userId);
  const seconds = assignmentsData?.unsubmitted[0].endDate.seconds || 0;
  const date = new Date(seconds * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDay = weekDays[date.getDay()];

  // 특정 날짜까지의 D-day를 계산하는 함수
  const calculateDDay = (seconds: number): number => {
    const endDate = new Date(seconds * 1000);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const differenceInMilliseconds = endDate.getTime() - now.getTime();
    const differenceInDays = differenceInMilliseconds / 86400000;
    const dDay = Math.ceil(differenceInDays);

    return dDay;
  };

  const dDay = calculateDDay(seconds);

  return isReminderVisible && assignmentsData?.unsubmitted ? (
    <div className="h-[117px] border flex-col bg-blue-800 rounded-xl flex justify-between px-[28px] py-[24px] mb-[50px]">
      <div className="flex justify-between">
        <div className="text-primary-5 text-base">
          <span className="font-bold">{userData?.username}</span>
          <span className="font-extralight">
            님, 아직 제출하지 않은 과제가 있어요!
          </span>
        </div>
        <button onClick={() => setIsReminderVisible(false)}>
          <Image
            src="/images/xbutton.svg"
            width={16}
            height={16}
            alt="리마인더 가리기 버튼"
          />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <span className="text-yellow-200 text-2xl font-bold mr-[13px]">
            {dayFromNow}일차_{month}월 {day}일({weekDay}) 과제 제출
          </span>
          <span className="rounded-xl border block bg-white w-[63px] h-[24px] text-blue-800 font-bold text-lg text-center leading-6 mt-1">
            D-{dDay}
          </span>
        </div>
        <button
          className="text-white"
          onClick={() => router.push("/assignment")}
        >
          과제방으로 가기
        </button>
      </div>
    </div>
  ) : null;
};

export default Reminder;
