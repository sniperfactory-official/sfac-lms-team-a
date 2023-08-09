"use client";

import { Lecture } from "@/types/firebase.types";
import React, { useEffect, useState } from "react";
import { DnDWrapper } from "./DnDWrapper";
import useGetCoursesInfoQuery from "@/hooks/reactQuery/lecture/useGetCoursesInfoQuery";

export interface Content {
  id: Lecture["id"];
  title: Lecture["title"];
  order: number; // Lecture["order"]
  checked?: boolean;
}

interface Props {
  courseId?: string;
  header: string;
  contents: Content[];
  isEdit?: boolean;
  isCourseChecked?: boolean;
  lectureCheckHandler?: (id: string) => void;
  courseCheckHandler?: (courseId: string) => void;
  onDragEnd: (newOrder: any[]) => void;
  isOpenCourse?: boolean;
  editDoneButtonHandler?: () => void;
  setChangeCourseTitle?: string[];
  isAssignmentSidebar?: boolean;
}

const Sidebar = ({
  header,
  contents,
  courseId,
  isEdit,
  isCourseChecked,
  lectureCheckHandler,
  courseCheckHandler,
  onDragEnd,
  isOpenCourse,
  isAssignmentSidebar,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true); // 강의 리스트 열린 상태
  const { data: courseData } = useGetCoursesInfoQuery();

  const onOpenCourse = () => {
    if (!isEdit) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (courseData) {
      const findFirstCourseId = courseData.find((courseItem: any) => {
        return courseItem.order === 0;
      })?.id;

      if (
        (findFirstCourseId && courseId === findFirstCourseId) ||
        isAssignmentSidebar
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [courseData]);

  return (
    <div className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={onOpenCourse}
      >
        <div className="w-[55px] flex justify-center items-center">
          {isEdit ? (
            <>
              <input
                type="checkbox"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                onChange={() => {
                  if (courseCheckHandler !== undefined)
                    courseCheckHandler(courseId as string);
                }}
                value={courseId}
                checked={isCourseChecked}
              />
            </>
          ) : (
            <span className="text-sm">🎯</span>
          )}
        </div>

        <span id={courseId}>{header}</span>
      </div>

      {isOpen || isOpenCourse ? (
        <ul className="my-[10px]">
          {!isEdit ? (
            <>
              {contents.map(content => (
                <li
                  key={content.id}
                  className="flex items-center text-sm text-grayscale-80 py-[10px] cursor-pointer"
                >
                  <div className="w-[55px] flex justify-center items-center">
                    {isEdit && (
                      <input
                        type="checkbox"
                        value={content.id}
                        onChange={() => {
                          if (lectureCheckHandler !== undefined)
                            lectureCheckHandler(content.id);
                        }}
                        checked={content.checked}
                      />
                    )}
                  </div>
                  {content.title}
                </li>
              ))}
            </>
          ) : (
            <DnDWrapper
              dragSectionName={courseId ? courseId : "dragSectionName"}
              dragList={contents}
              onDragEnd={onDragEnd}
            >
              {(dragItem, ref, isDragging) => (
                <li
                  ref={ref}
                  key={dragItem.id}
                  className={`flex items-center text-sm text-grayscale-80 py-[10px] cursor-pointer ${
                    isDragging && "opacity-20"
                  }`}
                >
                  <div className="w-[55px] flex justify-center items-center">
                    <input
                      type="checkbox"
                      value={dragItem.id}
                      onChange={() => {
                        if (lectureCheckHandler !== undefined)
                          lectureCheckHandler(dragItem.id);
                      }}
                      checked={dragItem.checked}
                    />
                  </div>
                  {dragItem.title}
                </li>
              )}
            </DnDWrapper>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
