"use client";
import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";
import useGetAllLectureListQuery from "@/hooks/reactQuery/lecture/useGetAllLectureListQuery";
import { useState } from "react";
import Button from "@/app/classroom/(components)/Button";
import { Lecture } from "@/types/firebase.types";

const ClassroomPage = () => {
  // 모든 강의 섹션 정보(course 컬렉션) 가져오기
  const { data: courseData, isLoading: courseLoading } =
    useGetCoursesInfoQuery();

  // selectedCourseId:: 여기에 현재 선택한 course 컬렉션의 id를 넣어야함.
  const [selectedCourseId, setSelectedCourseId] = useState(""); // 클릭한 course id 값
  const [selectedCourseLectures, setSelectedCourseLectures] = useState<
    Lecture[]
  >([]);

  // 모든 강의 목록 가져오기
  const { data: allLecturesData } = useGetAllLectureListQuery();
  console.log("test:: ", allLecturesData);

  // 각 course 섹션의 상태와 선택한 강의 리스트를 개별적으로 관리하기 위한 객체
  const [sectionStates, setSectionStates] = useState<{
    [key: string]: { isOpen: boolean; lectures: Lecture[] };
  }>({});

  const [isEdit, setIsEdit] = useState(false);
  const [isCourseChecked, setIsCourseChecked] = useState(false);

  // useEffect로 빈 스트링이 아니면, selectedCourseId가 변경될 때만 filter 적용하기
  // 특정 코스 섹션을 선택했을 때, 해당 코스 id와 일치하는 강의 목록 courseId를 매칭하기
  // course 섹션 클릭 시, --> 최상위 컴포넌트가 갖는것이 맞다.
  const courseClickHandler = (selectedCourseId: string) => {
    // 현재 클릭한 course 섹션의 상태 정보 가져오기
    const currentSectionState = sectionStates[selectedCourseId];

    // // 현재 클릭한 course 섹션의 상태 정보가 없으면 초기 상태로 설정
    if (!currentSectionState) {
      setSectionStates(prev => ({
        ...prev,
        [selectedCourseId]: { isOpen: true, lectures: selectedCourseLectures },
      }));
    } else {
      // 기존에 선택한 상태 정보가 있으면 토글
      setSectionStates(prev => ({
        ...prev,
        [selectedCourseId]: {
          ...currentSectionState,
          isOpen: !currentSectionState.isOpen,
        },
      }));
    }

    setSelectedCourseId(selectedCourseId);
  };

  // 수정버튼 클릭 여부
  const isEditButton = () => {
    setIsEdit(!isEdit);
  };

  // 수정하기 버튼 클릭 시, input 체크
  const courseCheckHandler = () => {
    setIsCourseChecked(!isCourseChecked);
  };

  // 데이터 로딩 중일 때 처리
  if (courseLoading) {
    return <div>로 딩 중...</div>;
  }

  console.log("courseData:::: ", courseData);

  return (
    <div>
      {/* {courseData?.map(courseInfo => (
        <Sidebar
          key={courseInfo.id}
          courseId={courseInfo.id}
          header={courseInfo.title}
          contents={
            sectionStates[courseInfo.id]?.isOpen
              ? sectionStates[courseInfo.id] || []
              : []
          }
          isOpen={sectionStates[courseInfo.id]?.isOpen || false}
          setIsOpen={() => courseClickHandler(courseInfo.id)}
          isEdit={isEdit}
          isCourseChecked={isCourseChecked}
        />
      ))} */}

      <div>
        {courseData?.length === 0 ? (
          <Button onClick={isEditButton}>섹션 추가</Button>
        ) : (
          <>
            <Button onClick={isEditButton}>섹션 추가</Button>
            <Button onClick={isEditButton}>섹션 수정</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassroomPage;
