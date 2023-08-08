"use client";

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

type CategoryType = "마이페이지";
type SubCategoryType = "전체";

const MAIN_CATEGORIES = [
  { icon: "👤", category: "마이페이지" as CategoryType },
];

const SUB_CATEGORIES = [{ category: "전체" as SubCategoryType }];

interface MainButtonProps {
  type: "main";
  category: CategoryType;
  icon: string;
  isActive?: boolean;
  onClick?: (category: CategoryType) => void;
}

interface SubButtonProps {
  type: "sub";
  category: SubCategoryType;
  isActive?: boolean;
  onClick?: (category: SubCategoryType) => void;
}

const MainButton: React.FC<MainButtonProps> = ({
  category,
  icon,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick(category);
  };
  const buttonClass = `w-[245px] h-[46px] rounded-[10px]
    py-[13px] pr-[35px] pl-[20px] mb-2.5
    ${isActive ? "bg-primary-10" : "hover:bg-primary-10"}
    flex items-center `;

  return (
    <button onClick={handleClick} className={buttonClass}>
      <span className="text-xl mr-5">{icon}</span>
      <span className="font-medium text-base">{category}</span>
    </button>
  );
};

const SubButton: React.FC<SubButtonProps> = ({
  category,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick(category);
  };

  const buttonClass = ` w-full h-[46px] py-2 px-4
    ${isActive ? "text-blue-500" : ""}
    flex
    `;

  return (
    <button onClick={handleClick} className={buttonClass}>
      <span className="font-medium text-base ml-[47px]">{category}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  const [activeMain, setActiveMain] = useState<CategoryType>("마이페이지");
  const [activeSub, setActiveSub] = useState<SubCategoryType>("전체");

  return (
    <aside>
      {MAIN_CATEGORIES.map(item => (
        <MainButton
          type="main"
          category={item.category}
          icon={item.icon}
          isActive={item.category === activeMain}
          onClick={setActiveMain}
          key={uuid()}
        />
      ))}
      {SUB_CATEGORIES.map(item => (
        <SubButton
          type="sub"
          category={item.category}
          isActive={item.category === activeSub}
          onClick={setActiveSub}
          key={uuid()}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
