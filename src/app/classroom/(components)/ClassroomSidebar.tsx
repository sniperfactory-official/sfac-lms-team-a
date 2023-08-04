"use client";

import React, { useState, useEffect } from "react";
import CourseSection from "./CourseSection";
import { LectureProps } from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import Button from "@/app/classroom/(components)/Button";
import EditButton from "@/components/common/Button";
import useCreateCourse from "@/hooks/reactQuery/lecture/useCreateCourse";
import { useMutation } from "@tanstack/react-query";
import { Course } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import useDeleteCourse from "@/hooks/reactQuery/lecture/useDeleteCourse";

interface ClassroomSidebarProps {
  courseData: CourseProps[];
  allLecturesData: { [key: string]: LectureProps[] };
}

const ClassroomSidebar = ({
  courseData,
  allLecturesData,
}: ClassroomSidebarProps) => {
  const [checkedLectureIds, setCheckedLectureIds] = useState<string[]>([]); // 체크된 강의 리스트
  const [courseChecked, setCourseChecked] = useState<string[]>([]); // 체크된 섹션

  // 섹션 수정 버튼 상태
  const [isEdit, setIsEdit] = useState(false);

  // 섹션 수정 버튼 토글
  const editButtonHandler = () => {
    setIsEdit(!isEdit);
  };

  // 섹션 추가
  const createMutation = useCreateCourse();

  const onCreateCourse = () => {
    const order = courseData[courseData.length - 1].order;
    createMutation.mutate(order + 1);
  };

  // 섹션 삭제
  const deleteMutation = useDeleteCourse();
  const onDeleteCourse = () => {
    deleteMutation.mutate({
      lectureId: checkedLectureIds,
      courseId: courseChecked,
    });
  };

  // 강의 리스트 체크박스의 체크 상태만 관리한다.
  const onLectureCheck = (lectureId: string) => {
    const currentCheckLectureIds = checkedLectureIds.includes(lectureId)
      ? checkedLectureIds.filter((id: any) => id !== lectureId)
      : [...checkedLectureIds, lectureId];
    console.log("currentCheckLectureIds:", currentCheckLectureIds);

    setCheckedLectureIds(currentCheckLectureIds);

    // 이거의 키값으로 에브리 돌리고, 모든게 체크 되있다면 코스 배열에 코스 아이디값을 넣고
    const resultLectures = [];
    for (let key in allLecturesData) {
      const result = allLecturesData[key].every((lecture: any) => {
        return currentCheckLectureIds.includes(lecture.id);
      });
      if (result) {
        resultLectures.push(key);
      }
      console.log(result);
    }
    console.log("resultLectures : ", resultLectures);
    if (resultLectures.length > 0) {
      setCourseChecked([...resultLectures]);
    }
  };

  // onCourseCheck 클릭 시, course의 체크 상태 값이 바뀜에 따라서 lecture들도 바뀐다.
  const onCourseCheck = (courseId: string) => {
    const currentCheckCourse = courseChecked.includes(courseId)
      ? courseChecked.filter((id: any) => id !== courseId)
      : [...courseChecked, courseId];

    setCourseChecked(currentCheckCourse); //비동기로 돌아가서 실제 내가 for in 돌리는 데이터랑 다를 수 있다.
  };

  useEffect(() => {
    // 코스 섹션을 체크했을 때, 그 값이 true면 모든 강의 항목의 Id를 배열에 담는다.
    const resultLectures = [];
    for (let key of courseChecked) {
      if (
        allLecturesData[key] !== undefined &&
        allLecturesData[key].length > 0
      ) {
        resultLectures.push(
          ...allLecturesData[key].map(e => {
            return e.id;
          }),
        );
      }
    }

    const filteringLectures = resultLectures.filter(e => {
      return !checkedLectureIds.includes(e);
    });

    setCheckedLectureIds([...checkedLectureIds, ...filteringLectures]);
  }, [courseChecked]);

  return (
    <>
      {courseData.map((courseItem: CourseProps) => (
        <CourseSection
          key={courseItem.id}
          courseData={courseItem}
          allLecturesData={allLecturesData[courseItem.id] || []}
          isEdit={isEdit}
          checkedLectureIds={checkedLectureIds}
          courseChecked={courseChecked}
          editButtonHandler={editButtonHandler}
          setCheckedLectureIds={() => setCheckedLectureIds}
          setCourseChecked={setCourseChecked}
          onLectureCheck={(lectureId: string) => onLectureCheck(lectureId)}
          onCourseCheck={onCourseCheck}
        />
      ))}

      <div>
        <Button onClick={onCreateCourse}>섹션 추가</Button>

        {courseData?.length === 0 ? (
          <></>
        ) : (
          <>
            <Button onClick={editButtonHandler}>섹션 수정</Button>
            {isEdit ? (
              <div className="flex">
                <EditButton text="수정 완료" isError={false} disabled={false} />
                <button onClick={onDeleteCourse}>강의 삭제</button>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ClassroomSidebar;