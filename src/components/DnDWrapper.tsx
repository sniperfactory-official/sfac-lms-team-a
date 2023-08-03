"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDnD } from "@/hooks/common/useDnD";

// 드래그 앤 드랍을 처리하는 래퍼 컴포넌트의 속성들을 정의한다.
interface DnDWrapperPropsType {
  dragList: any[]; // 드래그 가능한 항목의 목록
  onDragging?: (newOrder: any[]) => void; // 항목이 드래그 중일 때 호출되는 함수
  onDragEnd: (newOrder: any[]) => void; // 드래그가 종료되었을 때 호출되는 함수
  children: (
    item: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode; // 각 항목을 랜더링하는 함수
  dragSection: string; // 드래그 섹션 이름
}

// 각 드래그 가능한 항목의 속성들을 정의한다.
interface DraggableItemProps {
  dragItem: any; // 드래그 가능한 항목
  itemIndex: number; // 항목의 인덱스
  onMove: (dragIndex: number, hoverIndex: number, isFinished: boolean) => void; // 항목이 이동했을 때 호출되는 함수
  itemRenderer: (
    dragItem: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode; // 항목을 랜더링하는 함수
  dragSection: string; // 드래그 섹션 이름
}

// 드래그 앤 드랍을 처리하는 래퍼 컴포넌트를 정의한다.
export const DnDWrapper = ({
  dragList,
  onDragging,
  onDragEnd,
  children,
  dragSection,
}: DnDWrapperPropsType) => {
  const [currentItems, setCurrentItems] = useState(dragList); // 현재 항목의 상태를 관리한다.

  // 항목이 이동했을 때 호출되는 함수를 정의한다.
  const handleItemMove = (
    dragIndex: number,
    hoverIndex: number,
    isFinished: boolean,
  ) => {
    const newItems = [...currentItems]; // 현재 항목의 복사본을 만든다.
    const [draggedItem] = newItems.splice(dragIndex, 1); // 드래그된 항목을 복사본에서 제거한다.
    newItems.splice(hoverIndex, 0, draggedItem); // 드래그된 항목을 새로운 위치에 삽입한다.
    setCurrentItems(newItems); // 현재 항목의 상태를 업데이트한다.

    if (isFinished) {
      onDragEnd(newItems); // 드래그가 종료되었을 때 콜백 함수를 호출한다.
    } else {
      onDragging && onDragging(newItems); // 항목이 드래그 중일 때 콜백 함수를 호출한다.
    }
  };

  // 각 항목을 랜더링한다.
  return (
    <DndProvider backend={HTML5Backend}>
      {currentItems.map((item, idx) => (
        <DraggableItem
          key={item.id}
          dragItem={item}
          itemIndex={idx}
          onMove={handleItemMove}
          itemRenderer={children}
          dragSection={dragSection}
        />
      ))}
    </DndProvider>
  );
};

// 드래그 가능한 항목 컴포넌트를 정의한다.
const DraggableItem = ({
  dragItem,
  itemIndex,
  onMove,
  itemRenderer,
  dragSection,
}: DraggableItemProps) => {
  const { ref, isDragging } = useDnD({ itemIndex, onMove, dragSection }); // useDnD 훅을 사용하여 드래그 앤 드랍을 처리한다.
  return itemRenderer(dragItem, ref, isDragging); // 항목을 랜더링한다.
};
