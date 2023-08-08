/*
  ** 드래그앤드랍 예제파일 **

  * react-dnd-html5-backend 관련 에러뜰경우
  패키지 인스톨필요 "yarn add react-dnd-html5-backend"

  * 만약 DnDWrapper안에 컴포넌트를 칠드런으로 넘길경우 forwardRef사용 필수
*/

"use client";
import React, { useState, ForwardedRef } from "react";
import { DnDWrapper } from "@/components/DnDWrapper";

export interface TestDnDItem {
  id: string;
  text: string;
}

const DnDExamplePage = () => {
  const [initialItems, _] = useState<TestDnDItem[]>([
    {
      id: "1~",
      text: "Write a cool JS library",
    },
    {
      id: "2~",
      text: "Make it generic enough",
    },
    {
      id: "3~",
      text: "Write README",
    },
    {
      id: "4~",
      text: "Create some examples",
    },
    {
      id: "5~",
      text: "Spam in Twitter and IRC to promote it",
    },
    {
      id: "6~",
      text: "???",
    },
    {
      id: "7~",
      text: "PROFIT",
    },
  ]);
  const whenDragging = (newList: TestDnDItem[]) => {
    // console.log("!드래그중일떄", newList);
  };
  const whenDragEnd = (newList: TestDnDItem[]) => {
    console.log("@드래그끝났을떄", newList);
  };

  return (
    <>
      <div>DnD 예제코드.</div>
      <div className="flex justify-around">
        <div className="border border-gray-950 mb-10">
          <DnDWrapper
            dragList={initialItems}
            onDragging={whenDragging}
            onDragEnd={whenDragEnd}
            dragSectionName={"abc"}
          >
            {(dragItem, ref, isDragging) => (
              <li
                ref={ref}
                className={`p-2 border border-blue-700 m-2 ${
                  isDragging ? "opacity-20" : ""
                }`}
              >
                <p>{dragItem.id}</p>
                <p>{dragItem.text}</p>
              </li>
            )}
          </DnDWrapper>
        </div>
        <div className="border border-gray-950">
          <DnDWrapper
            dragList={initialItems}
            onDragging={whenDragging}
            onDragEnd={whenDragEnd}
            dragSectionName={"def"}
          >
            {(dragItem, ref, isDragging) => (
              <DnDTestComponent
                dragData={dragItem}
                ref={ref}
                isDragging={isDragging}
                zxzx="다른프롭스내려봄"
                yzyz="또다른프롭스내려봄"
              />
            )}
          </DnDWrapper>
        </div>
      </div>
    </>
  );
};

export default DnDExamplePage;

interface DnDTestComponentProps {
  dragData: TestDnDItem;
  isDragging: boolean;
  zxzx: string;
  yzyz: string;
}

const DnDTestComponent = React.forwardRef(
  (
    { dragData, isDragging, zxzx, yzyz }: DnDTestComponentProps,
    // { dragData, isDragging, ...props }: DnDTestComponentProps,
    ref: ForwardedRef<HTMLLIElement>,
  ) => (
    <li
      ref={ref}
      className={`p-2 border border-red m-2 ${isDragging ? "opacity-20" : ""}`}
    >
      <p>{dragData.id}</p>
      <div>{yzyz}</div>
      {/* <div>{props.zxzx}</div> */}
    </li>
  ),
);
