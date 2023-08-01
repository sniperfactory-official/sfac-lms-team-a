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
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
