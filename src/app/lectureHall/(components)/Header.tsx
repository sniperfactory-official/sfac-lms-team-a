"use client";

import timestampToDate from "@/utils/timestampToDate";
import { LectureSummary } from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Text, Title } from "sfac-designkit-react";

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
          <Title size="2xl">{LetcureInfo.title}</Title>
        </div>
        <div className="w-full flex flex-col ml-16">
          <div className="items-end flex mb-4 mt-2">
            <Text size="sm" weight="medium">
              [수강기간]{startDate}~{endDate}
            </Text>
          </div>
          <div className="flex h-full items-center">
            <div className="w-9 relative h-9 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
              {LetcureInfo.user && (
                <Avatar
                  src={LetcureInfo.user.profileImage}
                  ring={false}
                  className="object-cover w-full h-full rounded-full"
                />
              )}
            </div>
            {LetcureInfo.user && (
              <Text size="base" weight="bold" className="text-primary-80">
                {LetcureInfo.user.username}
              </Text>
            )}{" "}
            <div className="rounded-full h-[5px] w-[5px] ml-2 mr-2 bg-grayscale-60"></div>{" "}
            {LetcureInfo.user &&
              (LetcureInfo.user.role === "관리자" ? (
                <Text size="base" weight="medium" className="text-grayscale-60">
                  매니저
                </Text>
              ) : (
                LetcureInfo.user.role
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureHallHeader;
