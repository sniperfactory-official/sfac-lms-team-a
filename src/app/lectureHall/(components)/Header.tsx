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
    <div className="w-full h-32 border-b-2 border-grayscale-5 ">
      {
        <div className="h-full flex flex-col justify-center ml-28">
          <h1 className="text-xl font-bold ">{LetcureInfo.title}</h1>
          <div className="text-sm">
            [수강기간]{startDate}~{endDate}
          </div>
          <div>
            {LetcureInfo.user && LetcureInfo.user.username} ·{" "}
            {LetcureInfo.user && LetcureInfo.user.role}
          </div>
        </div>
      }
    <div className="w-full h-32 border-b-2 border-grayscale-5 flex">
      <Link href={"/classroom"}>
        <Image
          src="images/Arrow.svg"
          width={15}
          height={15}
          alt="뒤로가기 화살표"
          className="ml-16 mb-auto mt-5"
        />
      </Link>
      <div>
        {
          <div className="h-full flex flex-col justify-center ml-16 mb-5">
            <h1 className="text-2xl font-bold flex">{LetcureInfo.title}</h1>
            <div className="text-sm">
              [수강기간]{startDate}~{endDate}
            </div>
            <div className="flex mt-5">
              {LetcureInfo.user && (
                <Image
                  src={
                    LetcureInfo.user.profileImage === ""
                      ? "images/logo.svg"
                      : LetcureInfo.user.profileImage
                  }
                  width={30}
                  height={30}
                  alt="프로필 이미지"
                  className="mr-3"
                ></Image>
              )}
              {LetcureInfo.user && (
                <span className="text-primary-80">
                  {LetcureInfo.user.username}
                </span>
              )}{" "}
              · {LetcureInfo.user && LetcureInfo.user.role}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default LectureHallHeader;
