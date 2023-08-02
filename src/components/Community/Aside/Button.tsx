import React from "react";

interface ButtonProps {
  icon: string;
  text: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, text: string) => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      onClick={e => onClick && onClick(e, text)}
      className={`
        w-[245px] h-[46px] rounded-[10px] 
        py-[13px] pr-[35px] pl-[20px] mb-2.5
        ${isActive ? "bg-primary-10" : "hover:bg-primary-10"}
        flex items-center
      `}
    >
      <span className="text-xl mr-5">{icon}</span>
      <span className="font-medium text-base">{text}</span>
    </button>
  );
};

export default Button;
