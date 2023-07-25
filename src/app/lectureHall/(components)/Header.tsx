"use client";

import useGetLectureInfoQuery from "@/hooks/reactQuery/lecture/useGetLectureInfoQuery";
import { Lecture } from "@/types/firebase.types";
import timestampToDate from "@/utils/timestampToDate";
import { LectureSummary } from "./Wrapper";

const LectureHallHeader = ({ LetcureInfo }:{LetcureInfo:LectureSummary}) => {
    
 const startDate = timestampToDate(LetcureInfo.startDate);
        const endDate = timestampToDate(LetcureInfo.endDate);
        return (
            <div className="w-full h-40">
                {
                    <div>
                        <h1>{LetcureInfo.title}</h1>
                        <div>[수강기간]{startDate}~{endDate}</div>
                        <div>{LetcureInfo.user && LetcureInfo.user.username} · {LetcureInfo.user && LetcureInfo.user.role}</div>
                    </div>
                }
    </div>)
}

export default LectureHallHeader;