"use client";
import Image from "next/image";
import { Lecture } from "@/types/firebase.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updatePlayLecture } from "@/redux/lectureSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// 강의 리스트 항목
const LectureItem = ({ item, index }: { item: Lecture; index: number }) => {
  const {
    title,
    lectureContent,
    startDate,
    endDate,
    lectureType,
    id,
    courseId,
  } = item;

  const lectureIcon =
    lectureType === "노트" ? "📒" : lectureType === "비디오" ? "🎬" : "🔗";

  return (
    <div key={item.id} className="border rounded-lg flex h-40 py-5 px-7">
      <div>
        <Image
          src="/images/logo.svg"
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
        <h3 className="text-base font-bold">
          {`${lectureIcon} ` + `${title}`}
        </h3>
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
        <Link
          href={`/lectureHall/${id}`}
          className="bg-grayscale-5 px-14 py-2 rounded-lg"
        >
          {lectureType}보기
        </Link>
      </div>
    </div>
  );
};

export default LectureItem;
