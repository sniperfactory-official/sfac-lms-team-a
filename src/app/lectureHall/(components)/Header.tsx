"use client";

import timestampToDate from "@/utils/timestampToDate";
import { LectureSummary } from "./Wrapper";
import Image from "next/image";
import Link from "next/link";

const LectureHallHeader = ({
  LetcureInfo,
}: {
  LetcureInfo: LectureSummary;
}) => {
  const startDate = timestampToDate(LetcureInfo.startDate);
  const endDate = timestampToDate(LetcureInfo.endDate);

  return (
    <div className="w-full h-36 border-b-2 border-grayscale-5 flex items-center">
      <div className="h-full flex flex-col justify-center ml-8">
        <div className="flex mt-5">
          <Link href={"/classroom"} className="h-full flex mt-1 mr-8">
            <Image
              src="/images/backPage.svg"
              width={15}
              height={15}
              alt="뒤로가기 화살표"
              className="ml-4"
            />
          </Link>
          <h1 className="text-2xl font-bold flex h-full items-end">
            {LetcureInfo.title}
          </h1>
        </div>
        <div className="w-full flex flex-col ml-16">
          <div className="text-sm items-end flex mb-2">
            [수강기간]{startDate}~{endDate}
          </div>
          <div className="flex h-full items-center">
            <div className="w-9 relative h-9 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
              {LetcureInfo.user &&
                (LetcureInfo.user.profileImage === (undefined || "") ? (
                  <Image
                    src="/images/logo.svg"
                    width={30}
                    height={30}
                    objectFit="cover"
                    alt="프로필 이미지"
                    className="ml-2 mr-2"
                  />
                ) : (
                  <Image
                    src={LetcureInfo.user.profileImage}
                    fill
                    alt="프로필 이미지"
                    objectFit="cover"
                  />
                ))}
            </div>
            {LetcureInfo.user && (
              <span className="text-primary-80">
                {LetcureInfo.user.username}
              </span>
            )}{" "}
            ·{" "}
            {LetcureInfo.user &&
              (LetcureInfo.user.role === "관리자"
                ? "매니저"
                : LetcureInfo.user.role)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureHallHeader;
