"use client";

import { Lecture } from "@/types/firebase.types";
import React, { useState } from "react";
import { DnDWrapper } from "./DnDWrapper";

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
}: Props) => {
  const [isOpen, setIsOpen] = useState(true); // 강의 리스트 열린 상태

  const onOpenCourse = () => {
    if (!isEdit) {
      // 수정 상태가 true면,
      setIsOpen(!isOpen); // 오픈해두고(true)
    } else {
      setIsOpen(isOpen); // 닫고(false)
    }
  };

  return (
    <div className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={onOpenCourse}
      >
        {/* 섹션의 체크박스 영역 */}
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

        {/* 섹션의 타이틀 영역 */}
        <span id={courseId}>{header}</span>
      </div>

      {/* 섹션의 하위 강의 리스트 영역 --> 위에서 섹션 타이틀 클릭여부에 따라 isOpen 상태가 결정된다. */}
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
