"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import useUpdateLectureOrder from "@/hooks/reactQuery/lecture/useUpdateLectureOrder";
import { Lecture } from "@/types/firebase.types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CourseSection = ({
  courseData,
  allLecturesData,
  isEdit,
  editDoneButtonHandler,
  checkedLectureIds,
  courseChecked,
  onLectureCheck,
  onCourseCheck,
  onClickedCourse,
  isOpenCourse,
  setChangeCourseTitle,
}: any) => {
  const [isCheck, setIsChecked] = useState(false);
  const [lectureListItem, setLectureListItem] = useState([]);
  const userRole = useSelector((store: RootState) => store.userInfo); // 스토어에서 사용자 정보 가져오기

  // 강의 순서를 변경하는 뮤테이션 훅
  const { mutateAsync: updateLectureOrderMutate } = useUpdateLectureOrder();

  useEffect(() => {
    // 강의 순서를 변경
    const result = courseChecked.includes(courseData.id); // true, false
    const updateLectureList = allLecturesData.map((lecture: any) => {
      return {
        id: lecture.id,
        title: lecture.title,
        checked: checkedLectureIds.includes(lecture.id),
        isPrivate: lecture.isPrivate,
      };
    });

    setIsChecked(result);
    setLectureListItem(updateLectureList);
  }, [courseChecked, courseData, allLecturesData, checkedLectureIds]);

  const onDragEndTest = (movedLectureItem: any) => {
    setLectureListItem(movedLectureItem);
    updateLectureOrderMutate(movedLectureItem); // 드래그 앤 드롭으로 변경된 순서를 Firebase에 저장한다.
  };

  // 더블 클릭으로 섹션 타이틀 수정하기
  const editCourseTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 섹션 타이틀에 해당하는 span 태그 id를 탐색해서, input 창으로 바꾸고 원하는 텍스트로 바꾸는 함수
    // sectionTitleElement는 courseData.id에 해당하는 태그를 들고온다. ( 섹션 타이틀의 감싸는 태그에 coureData.id 에 해당하는 id 값을 지정햤다. )
    const sectionTitleElement = document.getElementById(courseData.id);
    if (isEdit) {
      if (sectionTitleElement) {
        // 해당 sectionTitleElement 태그가 존재하면 아래의 내용을 실행한다.
        const currentValue = sectionTitleElement.textContent || ""; // sectionTitleElement의 현재 텍스트 값(섹션 타이틀)을 저장한다.
        const editDiv = document.createElement("div");
        const inputElement = document.createElement("input");

        inputElement.type = "text";
        inputElement.value = currentValue;
        inputElement.className = "w-36";
        editDiv.appendChild(inputElement);

        // 클릭 이벤트가 상위 요소로 전파되지 않게 함
        inputElement.addEventListener("click", e => e.stopPropagation());

        // 저장 버튼 생성
        const saveButton = document.createElement("button");
        saveButton.textContent = "저장";
        editDiv.appendChild(saveButton); // editDiv 안에 저장 button을 자식요소로 두어서
        saveButton.style.display = "none";

        // 엔터 클릭 시, 키보드 이벤트 발동하며
        inputElement.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            const newValue = inputElement.value; // 새로 입력된 값을 newValue에 할당 한다.
            sectionTitleElement.textContent = newValue; // 저장 버튼 클릭 시, 새로 입력한 값을 span의 텍스트로 바꿈
            editDiv.replaceWith(sectionTitleElement); // 해당 이벤트 실행 시, editDiv(편집모드) 태그를 sectionTitleElement로 변환
            setChangeCourseTitle((prevTitles: any) => {
              // 기존에 동일한 id가 있는지 찾기
              const existingCourseIndex = prevTitles.findIndex(
                (course: any) => course.id === courseData.id,
              );

              // 동일한 id가 있다면, 해당 항목의 title만 변경
              if (existingCourseIndex > -1) {
                const newTitles = [...prevTitles];
                newTitles[existingCourseIndex].title = newValue;
                return newTitles;
              }

              // 동일한 id가 없다면, 새로운 객체를 배열에 추가
              return [...prevTitles, { id: courseData.id, title: newValue }];
            });
          }
        });

        // 더블 클릭하는 애가 span(sectionTitleElement)이고, 더블 클릭 시, editDiv(input과 button 있는 곳)로 바꿈
        sectionTitleElement.replaceWith(editDiv); // 이 코드가 실행되면, sectionTitleElement 를 editDiv 로 변환
        inputElement.focus();
      }
      console.log("span에 적용된 변경된 섹션 타이틀: ", sectionTitleElement);
    }
  };

  return (
    <button
      onClick={() => onClickedCourse(courseData.id)}
      onDoubleClick={editCourseTitle}
      className="mb-2"
    >
      <Sidebar
        key={courseData.id}
        courseId={courseData.id}
        header={courseData.title}
        contents={
          userRole.role === "관리자"
            ? lectureListItem
            : lectureListItem.filter((lecture: any) => !lecture.isPrivate)
        }
        isEdit={isEdit} // 섹션 수정 상태
        editDoneButtonHandler={editDoneButtonHandler}
        isOpenCourse={isOpenCourse} // 강의 리스트 펼쳐짐 상태
        lectureCheckHandler={onLectureCheck} // 각 강의 항목 체크 여부
        isCourseChecked={isCheck} // 강의 중 하나라도 체크가 해제될 시, 섹션도 체크 해제 됨(코스의 체크 여부)
        courseCheckHandler={onCourseCheck} // 코스 섹션 체크 토글
        onDragEnd={onDragEndTest}
        setChangeCourseTitle={setChangeCourseTitle}
      />
    </button>
  );
};

export default CourseSection;
