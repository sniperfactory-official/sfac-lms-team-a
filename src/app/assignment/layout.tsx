import React from "react";

interface AssignmentLayoutProps {
  children: React.ReactNode;
}

const AssignmentLayout = ({ children }: AssignmentLayoutProps) => {
  return <div className="mb-[172px]">{children}</div>;
};

export default AssignmentLayout;
