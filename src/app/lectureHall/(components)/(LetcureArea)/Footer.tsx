"use client";

import useGetPrevNextLectureInfo from "@/hooks/reactQuery/lecture/useGetPrevNextLectureInfo";
import Image from "next/image";
import Link from "next/link";
import { Text } from "sfac-designkit-react";

const LectureFooter = ({ lectureId }: { lectureId: string }) => {
  const { data } = useGetPrevNextLectureInfo(lectureId);
  return (
    <div className="w-full h-full flex">
      {data && data.prevLectureId && (
        <Link
          className="ml-14 mr-auto text-lg font-bold text-grayscale-60 flex h-full items-center"
          href={`/lectureHall/${data.prevLectureId}`}
          about="이전 강의 버튼"
        >
          <Image
            src="/images/prevLectureButton.svg"
            alt="이전강의버튼"
            width={20}
            height={20}
            className="mr-3 mb-1"
          ></Image>
          <Text size="lg" weight="bold">
            이전강의
          </Text>
        </Link>
      )}
      {data && data.nextLectureId && (
        <Link
          className="ml-auto mr-14 text-grayscale-60 flex h-full items-center"
          href={`/lectureHall/${data.nextLectureId}`}
          about="다음 강의 버튼"
        >
          <Text size="lg" weight="bold">
            다음강의
          </Text>
          <Image
            src="/images/nextLectureButton.svg"
            alt="이전강의버튼"
            width={20}
            height={20}
            className="ml-3 mb-1"
          ></Image>
        </Link>
      )}
    </div>
  );
};

export default LectureFooter;
