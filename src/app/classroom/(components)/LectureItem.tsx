"use client";
import Image from "next/image";
import { Lecture } from "@/types/firebase.types";

// 강의 리스트 항목
const LectureItem = ({ item }: { item: Lecture }) => {
  const { title, lectureContent, startDate, endDate } = item;
  // console.log("강의 나오나 확인: ", item); 잘 되고있음

  return (
    <div key={item.id} className="border rounded-lg flex h-40 py-5 px-7">
      <div>
        <Image
          src=""
          width={216}
          height={132}
          alt={title}
          className="mr-5 h-full rounded-lg bg-slate-200"
        />
      </div>
      <div className="mr-20 flex flex-col justify-evenly grow">
        <span className="w-10 text-xs bg-grayscale-5 px-2.5 py-1 rounded-md text-center">
          {lectureContent.videoLength}분
        </span>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-xs font-medium">
          [수강기간]
          <div>
            {startDate.seconds}~{endDate.seconds}
          </div>
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-sm text-right">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <button className="bg-grayscale-5 px-14 py-2 rounded-lg">
          수강하기
        </button>
      </div>
    </div>
  );
};

export default LectureItem;
