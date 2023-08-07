"use client";

import React, { useState } from "react";
import ListData from "./ListData";
import Main from "./Main";
import Sub from "./Sub";

export interface Read {
  read: number;
  total: number;
}

const Detail = () => {
  const [read, setRead] = useState<Read>({ read: 0, total: 0 });
  return (
    <div className="flex mx-auto justify-center gap-x-[20px]">
      <ListData></ListData>
      <div>
        <Main read={read}></Main>
        <Sub setRead={setRead}></Sub>
      </div>
    </div>
  );
};

export default Detail;
