"use client";

import timestampToDate from "@/utils/timestampToDate";
import { LectureSummary } from "./Wrapper";

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
    </div>
  );
};

export default LectureHallHeader;
