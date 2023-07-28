"use client";
import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";
import { useEffect, useState } from "react";
import { Course } from "@/types/firebase.types";
import LectureList from "./(components)/LectureList";

const ClassroomPage = () => {
  const { data } = useGetCoursesInfoQuery(); // courses 컬렉션의 id, title, createdAt, updatedAt 값들을 배열 형태로 받아옴
  const [courseData, setCourseData] = useState<Course[]>([]);
  console.log("courseData", courseData);

  useEffect(() => {
    if (data) {
      setCourseData(data);
    }
  }, [data]);

  // 섹션 클릭 여부에 따라서 강의 리스트 데이터 패칭하기
  const [isCourseId, setIsCourseId] = useState<string>("");
  console.log(isCourseId); // 섹션 클릭 시, course의 id 값이 나온다.

  // 여기서 훅을 호출하며, isCourseClicked의 값이 바뀔 때마다 해당 코스의 강의 정보를 가져오기
  const { data: lectureListData } = useGetLectureListQuery(isCourseId);
  console.log("클릭한 강의 목록 데이터: ", lectureListData);

  return (
    <div>
      <div className="bg-orange-200">
        {courseData.map(courseTitle => (
          <button
            key={courseTitle.id}
            onClick={() => setIsCourseId(courseTitle.id)}
            className="bg-blue-200 flex"
          >
            {courseTitle.title}
          </button>
        ))}
        <div>
          {lectureListData?.map(listItem => (
            <button key={listItem.id} className="flex">
              {listItem.title}
            </button>
          ))}
        </div>
      </div>
      <LectureList isCourseId={isCourseId} />
    </div>
  );
};

export default ClassroomPage;
