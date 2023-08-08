"use client";

import React, { useState } from "react";
import Button from "./Button";
import CATEGORY_DATA from "@/constants/category";

interface AsideProps {
  onCategorySelect: (category: string) => void;
}

const Aside: React.FC<AsideProps> = ({ onCategorySelect }) => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (
    _: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    if (activeButton === category) {
      setActiveButton("");
      onCategorySelect("");
    } else {
      setActiveButton(category);
      onCategorySelect(category);
    }
  };

  return (
    <aside className="mr-[20px]">
      {CATEGORY_DATA.map(data => (
        <Button
          key={data.category}
          icon={data.icon}
          category={data.category}
          isActive={data.category === activeButton}
          onClick={handleButtonClick}
        />
      ))}
    </aside>
  );
};

export default Aside;
