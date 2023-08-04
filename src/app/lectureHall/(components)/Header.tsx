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
    <div className="w-full h-32 border-b-2 border-grayscale-5 flex">
      <Link href={"/classroom"}>
        <Image
          src="/images/Arrow.svg"
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
            <div className="flex mt-2 h-full items-center">
              <div className="w-11 relative h-11 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
                {LetcureInfo.user &&
                  (LetcureInfo.user.profileImage === (undefined || "") ? (
                    <Image
                      src="/images/logo.svg"
                      width={30}
                      height={30}
                      objectFit="cover"
                      alt="대댓글화살표이미지"
                      className="ml-2 mr-2"
                    />
                  ) : (
                    <Image
                      src={LetcureInfo.user.profileImage}
                      fill
                      alt="대댓글화살표이미지"
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
        }
      </div>
    </div>
  );
};

export default LectureHallHeader;
