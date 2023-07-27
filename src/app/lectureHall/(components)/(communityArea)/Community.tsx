"use client";

import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import { getTime } from "@/utils/getTime";

const LectureCommunityWrapper = () => {
  const { data,isLoading } = useGetLectureCommentQuery("mVwanklxft7kGVxiCpaq");
  if (isLoading) {
    return (
      <div>불러오는 중...</div>
    )
  }
  if (data !== undefined ) {
    return (
      <div className="bg-grayscale-10 w-full h-full p-4 overflow-y-auto">
        <div className="flex justify-between mb-3">
          <h1>강의 커뮤니티</h1>
          <button>작성</button>
        </div>
        <div>
          {
            data.map((e, i) => (
              <button key={i} className="w-full min-h-[90px] bg-white rounded-2xl p-4 flex items-center justify-center">
                <div className="w-11">
                  {e.user.profile }
                </div>
                <div className="flex-1">
                  <div className="flex"><div className="mr-1 text-base font-bold">{e.user.username}</div> · <div className="text-grayscale-40 ml-1">{ e.user.role }</div></div>
                  <div className="text-sm w-full flex">{e.content}</div>
                </div>
                <div className="text-grayscale-40 text-xs ">{ getTime(e.createdAt.toDate()) }</div>
              </button>
            ))
          }
        </div>
      </div>
    )
  }
};

export default LectureCommunityWrapper;
