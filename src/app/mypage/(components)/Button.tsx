"use client";

import React from "react";

type CategoryType = "마이페이지";
type SubCategoryType = "전체";

interface ButtonProps {
  type: "main" | "sub";
  category: CategoryType | SubCategoryType;
  isActive?: boolean;
  onClick?: (category: CategoryType | SubCategoryType) => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  category,
  isActive = category === "마이페이지",
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick(category);
  };

  const buttonClass =
    type === "main"
      ? `
    w-[245px] h-[46px] rounded-[10px]
    py-[13px] pr-[35px] pl-[20px] mb-2.5
    ${isActive ? "bg-primary-10" : "hover:bg-primary-10"}
    flex items-center
  `
      : `
    w-[135px] h-[46px]
    py-2 px-4 text-blue-500
    ${isActive ? "text-blue-500" : ""}
    flex justify-center
  `;

  return (
    <button onClick={handleClick} className={buttonClass}>
      <span className="text-xl mr-5">{type === "main" ? "👤" : ""}</span>
      <span className="font-medium text-base">{category}</span>
    </button>
  );
};

export default Button;
