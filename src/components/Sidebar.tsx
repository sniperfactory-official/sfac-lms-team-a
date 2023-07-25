import React, { useState } from "react";

export type List = {
  title: string;
  subList: string[];
};

interface Props {
  children: React.ReactNode;
  list: List[];
  onListClick: () => void;
  onBtnClick: () => void;
}

const Sidebar = ({ children, list, onBtnClick, onListClick }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeSubItemIndex, setActiveSubItemIndex] = useState<number | null>(
    null,
  );

  const handleListItemClick = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? 0 : index));
    setActiveSubItemIndex(null);
  };

  const handleSubListItemClick = (subIndex: number) => {
    setActiveSubItemIndex(subIndex);
    onListClick();
  };

  return (
    <aside className="w-60">
      <ul className="grid gap-2 text-base font-medium">
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className="h-12 flex align-middle p-3 pr-5 pb-3 pl-5 box-border rounded-lg bg-primary-5 cursor-pointer"
              onClick={() => handleListItemClick(index)}
            >
              <span className="text-xl mr-3.5 leading-5">🎯</span>
              {item.title}
            </li>
            {activeIndex === index && (
              <ul className="grid gap-2.5 text-sm font-medium">
                {item.subList.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`py-2 text-center cursor-pointer ${
                      activeSubItemIndex === subIndex ? "text-primary-80" : ""
                    }`}
                    onClick={() => handleSubListItemClick(subIndex)}
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="w-full h-12 mt-3 border border-primary-40 rounded-lg text-primary-60 text-base font-bold"
        onClick={onBtnClick}
      >
        {children}
      </button>
    </aside>
  );
};

export default Sidebar;
