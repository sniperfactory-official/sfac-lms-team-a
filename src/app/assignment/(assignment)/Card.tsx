import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  vertical?: boolean;
}

const Card = ({ children, vertical = false }: CardProps) => {
  return (
    <li
      className={`flex ${
        vertical ? "flex-col" : "flex-row"
      } rounded-lg p-7 border border-grayscale-10 list-none`}
    >
      {children}
    </li>
  );
};

export default Card;
