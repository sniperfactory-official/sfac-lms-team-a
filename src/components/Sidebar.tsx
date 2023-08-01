import { Lecture } from "@/types/firebase.types";
import React from "react";

type Content = Pick<Lecture, "id" | "title">;

interface Props {
  courseId?: string;
  header: string;
  contents: Content[];
  isOpen: boolean;
  isEdit?: boolean;
  isCourseChecked?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseCheckHandler?: () => void;
  children?: React.ReactNode;
}

const Sidebar = ({
  header,
  contents,
  courseId,
  isOpen,
  isEdit,
  isCourseChecked,
  setIsOpen,
  courseCheckHandler,
  children,
}: Props) => {
  return (
    <aside className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[55px] flex justify-center items-center">
          {isEdit ? (
            <input
              type="checkbox"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                e.stopPropagation();
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
                    checked={isCourseChecked}
                    disabled
                  />
                )}
              </div>
              {content.title}
            </li>
          ))}
        </ul>
      )}
      {children}
    </aside>
  );
};

export default Sidebar;
