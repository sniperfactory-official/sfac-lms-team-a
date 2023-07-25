"use client";
import { useState } from "react";
import LectureHallHeader from "./Header";
import type { Lecture,User } from "@/types/firebase.types";
import useGetLectureInfoQuery from "@/hooks/reactQuery/lecture/useGetLectureInfoQuery";
import { Timestamp } from "firebase/firestore";
import LetcureContent from "./(LetcureArea)/LectureContent";
import LectureCommunityWrapper from "./(LetcureArea)/Community";
export interface LectureSummary extends Omit<Lecture, 'userId' | 'course' | 'courseId' | 'isPrivate' | 'createdAt' | 'updatedAt' | 'lectureType' | 'lectureContent'> {}

const ContentArea = ({id}:{id:string}) => {
    const { data, isLoading, error, isFetching } = useGetLectureInfoQuery(id);
        if (isFetching) {
        return(<div>Loading...</div>)
    } else if(!isFetching && data !== undefined && data.user){
        return (
            <div className="w-full h-full">
                
                <LectureHallHeader LetcureInfo={data} />
                <div className="flex">
                    <div className="flex-[8]">
                        <LetcureContent contentType={{ lectureType: data.lectureType }} />
                    </div>
                    <div className="flex-[2]">
                        <LectureCommunityWrapper />
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentArea;