import React, { useState } from "react";
import Button from "./Button";
import CATEGORY_DATA from '@/constants/category';

const Aside = () => {
  const [activeButton, setActiveButton] = useState<string>(CATEGORY_DATA[0].text);

  const handleButtonClick = (
    _: React.MouseEvent<HTMLButtonElement>,
    text: string,
  ) => {
    setActiveButton(text);
  };

  return (
    <aside className="absolute top-[160px] left-[200px]">
      {CATEGORY_DATA.map(data => (
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
