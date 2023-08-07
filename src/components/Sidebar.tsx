"use client";

import { Lecture } from "@/types/firebase.types";
import React, { useState } from "react";

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
}

const Sidebar = ({
  header,
  contents,
  courseId,
  isEdit,
  isCourseChecked,
  lectureCheckHandler,
  courseCheckHandler,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[55px] flex justify-center items-center">
          {isEdit ? (
            <input
              type="checkbox"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              onChange={() => {
                if (courseCheckHandler !== undefined) courseCheckHandler();
              }}
              value={courseId}
              checked={isCourseChecked}
            />
          ) : (
            <span className="text-sm">🎯</span>
          )}
        </div>
        {header}
      </div>
      {isOpen && (
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
    </div>
  );
};

export default Sidebar;