import { Lecture } from "@/types/firebase.types";
import React, { useState } from "react";

type Content = Pick<Lecture, "id" | "title">;

interface Props {
  courseId?: string;
  header: string;
  contents: Content[];
  isEdit?: boolean;
  children?: React.ReactNode;
}

const Sidebar = ({ header, contents, courseId, isEdit, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-[245px]">
      <div
        className="flex items-center gap-4 py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[55px] flex justify-center items-center">
          {isEdit && courseId ? (
            <input
              type="checkbox"
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                e.stopPropagation()
              }
              value={courseId}
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
                {isEdit && <input type="checkbox" value={content.id} />}
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
