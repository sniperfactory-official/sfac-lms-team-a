"use client";

import React, { useState } from "react";
import Main from "./Main";
import SubmittedAssignmentList from "./SubmittedAssignmentList";

export interface Read {
  read: number;
  total: number;
}

const Detail = () => {
  const [read, setRead] = useState<Read>({ read: 0, total: 0 });
  return (
    <div className="flex mx-auto justify-center gap-x-[20px]">
      <div>
        <Main read={read} />
        <SubmittedAssignmentList setRead={setRead} />
      </div>
    </div>
  );
};

export default Detail;
