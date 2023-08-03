import React from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

export default function CreateLectureButton({
  onClick,
  children,
  disabled,
}: Props) {
  return (
    <button
      className="w-[115px] h-[35px] rounded-[10px] bg-grayscale-5 text-grayscale-20 enabled:bg-primary-80 enabled:text-white"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
