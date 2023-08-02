import React, { useState } from "react";
import Button from "./Button";


const ASIDE_DATA = [
  { icon: "🎯", category: "필독" },
  { icon: "🔊", category: "안내사항" },
  { icon: "👋", category: "질문있어요" },
  { icon: "🔥", category: "자유게시판" },
  { icon: "🔓", category: "익명 피드백" },
];

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

  return (
    <aside className="absolute top-[160px] left-[200px]">
      {ASIDE_DATA.map(data => (
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
