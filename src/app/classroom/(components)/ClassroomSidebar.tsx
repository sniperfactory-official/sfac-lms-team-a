"use client";

import React, { useState, useEffect } from "react";
import CourseSection from "./CourseSection";
import { LectureProps } from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import { CourseProps } from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import Button from "@/app/classroom/(components)/Button";
import useCreateCourse from "@/hooks/reactQuery/lecture/useCreateCourse";
import useDeleteCourse from "@/hooks/reactQuery/lecture/useDeleteCourse";
import useUpdateCourseTitle from "@/hooks/reactQuery/lecture/useUpdateCourseTitle";
import { Course } from "@/types/firebase.types";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ClassroomSidebarProps {
  courseData: CourseProps[];
  allLecturesData: { [key: string]: LectureProps[] };
  onClickedCourse: (courseData: string) => void;
}

const ClassroomSidebar = ({
  courseData,
  allLecturesData,
  onClickedCourse,
}: ClassroomSidebarProps) => {
  const [checkedLectureIds, setCheckedLectureIds] = useState<string[]>([]); // 체크된 강의 리스트
  const [courseChecked, setCourseChecked] = useState<string[]>([]); // 체크된 섹션
  const [isEdit, setIsEdit] = useState<boolean>(false); // 섹션 수정 버튼 상태
  const [isOpenCourse, setIsOpenCourse] = useState<boolean>(false); // 섹션 오픈 여부
  const userRole = useSelector((store: RootState) => store.userInfo); // 스토어에서 사용자 정보 가져오기

  // 강의 타이틀을 변경하는 뮤테이션 훅
  const { mutateAsync: updateCourseMutate } = useUpdateCourseTitle();

  // 변경된 섹션 타이틀을 배열로 저장한다.
  const [changeCourseTitle, setChangeCourseTitle] = useState<Course[]>([]);

  // 섹션 수정 모드 핸들러
  const editButtonHandler = () => {
    setIsEdit(!isEdit); // true (수정 가능 상태)
    setIsOpenCourse(!isOpenCourse); // true (코스의 하위 강위 열기)
  };

  useEffect(() => {
    if (isEdit) {
      setIsOpenCourse(true);
    }
  }, [isEdit]);

  // 섹션 수정 완료 핸들러(수정 모드를 나오기)
  const editDoneButtonHandler = () => {
    setIsEdit(!isEdit);
    setIsOpenCourse(!isOpenCourse);
    updateCourseMutate(changeCourseTitle);
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
    }

    if (resultLectures.length > 0) {
      setCourseChecked([...resultLectures]);
    } else if (resultLectures.length === 0) {
      setCourseChecked([]);
    }
  };

  // onCourseCheck 클릭 시, course의 체크 상태 값이 바뀜에 따라서 lecture들도 바뀐다.
  const onCourseCheck = (courseId: string) => {
    const currentCheckCourse = courseChecked.includes(courseId)
      ? courseChecked.filter((id: any) => id !== courseId)
      : [...courseChecked, courseId];

    setCourseChecked(currentCheckCourse); // 비동기로 돌아가서 실제 내가 for in 돌리는 데이터랑 다를 수 있다.
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
    <div className="flex flex-col mr-5">
      {courseData.map((courseItem: CourseProps) => (
        <CourseSection
          key={courseItem.id}
          courseData={courseItem}
          allLecturesData={allLecturesData[courseItem.id] || []}
          isEdit={isEdit} // 섹션 수정 상태
          editButtonHandler={editButtonHandler} // 섹션 수정 상태 변경 핸들러
          editDoneButtonHandler={editDoneButtonHandler} // 섹션 수정 완료 핸들러
          isOpenCourse={isOpenCourse}
          checkedLectureIds={checkedLectureIds}
          courseChecked={courseChecked}
          setCheckedLectureIds={() => setCheckedLectureIds}
          setCourseChecked={setCourseChecked}
          onLectureCheck={(lectureId: string) => onLectureCheck(lectureId)}
          onCourseCheck={onCourseCheck}
          onClickedCourse={onClickedCourse}
          setChangeCourseTitle={setChangeCourseTitle}
        />
      ))}

      <div>
        {/* 관리자인 경우에만 섹션 추가 버튼과 섹션 수정 버튼 보이게 처리 */}
        {userRole.role === "관리자" && (
          <>
            <Button onClick={onCreateCourse}>섹션 추가</Button>
            {/* 사이드바에 코스가 0보다 작다면, 섹션 추가 버튼만 나오게 처리 */}
            {courseData?.length > 0 ? (
              isEdit ? (
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-primary-80 text-white h-[50px] px-[28px] py-[14px] rounded-[10px]"
                    onClick={editDoneButtonHandler}
                  >
                    수정 완료
                  </button>
                  <button
                    className="bg-red text-white h-[50px] px-[28px] py-[14px] rounded-[10px]"
                    onClick={onDeleteCourse}
                  >
                    강의 삭제
                  </button>
                </div>
              ) : (
                <Button onClick={editButtonHandler}>섹션 수정</Button>
              )
            ) : null}
          </>
        )}
        {userRole.role === "수강생" && <></>}
      </div>
    </div>
  );
};

export default ClassroomSidebar;
