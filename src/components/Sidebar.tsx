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
  courseCheckHandler?: () => void;
  onDragEnd: (newOrder: any[]) => void;
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
}: Props) => {
  console.log(contents);

  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[55px] flex justify-center items-center">
          <span className="text-sm">🎯</span>
        </div>
        {header}
      </div>
      {isOpen && !isEdit && (
        <ul className="my-[10px]">
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
        </ul>
      )}
      {isOpen && isEdit && (
        <ul className="my-[10px]">
          <DnDWrapper
            dragSection="123123"
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
                  {isEdit && (
                    <input
                      type="checkbox"
                      value={dragItem.id}
                      // checked={isCourseChecked}
                      // value={content.id}
                      onChange={() => {
                        if (lectureCheckHandler !== undefined)
                          lectureCheckHandler(dragItem.id);
                      }}
                      checked={dragItem.checked}
                    />
                  )}
                </div>
                {dragItem.title}
              </li>
            )}
          </DnDWrapper>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
