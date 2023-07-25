"use client"

import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";



const LectureCommunityWrapper = () => {
    const { data } = useGetLectureCommentQuery("mVwanklxft7kGVxiCpaq");
    console.log(data)
    return (
        <div className="bg-slate-500 w-full h-full">


        </div>
    )
}

export default LectureCommunityWrapper;