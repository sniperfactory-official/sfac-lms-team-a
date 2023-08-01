import React, { useState } from "react";
import Button from "./Button";

const ASIDE_DATA = [
  { icon: "🎯", text: "필독" },
  { icon: "🔊", text: "안내사항" },
  { icon: "👋", text: "질문있어요" },
  { icon: "🔥", text: "자유게시판" },
  { icon: "🔓", text: "익명 피드백" },
];

const Aside = () => {
  const [activeButton, setActiveButton] = useState<string>(ASIDE_DATA[0].text);

  const handleButtonClick = (
    _: React.MouseEvent<HTMLButtonElement>,
    text: string,
  ) => {
    setActiveButton(text);
  };

  return (
    <aside className="absolute top-[160px] left-[200px]">
      {ASIDE_DATA.map(data => (
        <Button
          key={data.text}
          icon={data.icon}
          text={data.text}
          isActive={data.text === activeButton}
          onClick={handleButtonClick}
        />
      ))}
    </aside>
  );
};

export default Aside;
