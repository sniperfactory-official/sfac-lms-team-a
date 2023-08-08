"use client";

import { useParams } from "next/navigation";
import ContentArea from "../(components)/Wrapper";

const MainContent = ({}) => {
  const param = useParams();

  return (
    <div>
      <ContentArea id={param.lectureId as string} />
    </div>
  );
};

export default MainContent;
