"use client";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDnD } from "@/hooks/common/useDnD";

interface DnDWrapperPropsType {
  dragList: any[];
  onDragging?: (newOrder: any[]) => void; // 항목이 드래그 중일 때 호출되는 함수
  onDragEnd: (newOrder: any[]) => void; // 드래그가 종료되었을 때 호출되는 함수
  children: (
    item: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode; // 각 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름(각  드래그리스트는 섹션 이름을 다르게 해야 각 섹션 아이템간 이동이 불가)
}

interface DraggableItemProps {
  dragItem: any;
  itemIndex: number; // 항목의 인덱스
  onMove: (dragIndex: number, hoverIndex: number, isFinished: boolean) => void; // 항목이 이동했을 때 호출되는 함수
  itemRenderer: (
    dragItem: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode; // 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름
}

// 드래그 앤 드랍을 처리하는 래퍼 컴포넌트를 정의한다.
export const DnDWrapper = ({
  dragList,
  onDragging,
  onDragEnd,
  children,
  dragSectionName,
}: DnDWrapperPropsType) => {
  const [currentItems, setCurrentItems] = useState(dragList); // 현재 항목의 상태 관리

  // 항목이 이동했을 때 호출되는 함수.
  const handleItemMove = (
    dragIndex: number,
    hoverIndex: number,
    isFinished: boolean,
  ) => {
    const newItems = [...currentItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setCurrentItems(newItems);
    newItems.forEach((item, index) => {
      item.order = index;
    });
    if (isFinished) {
      onDragEnd(newItems); // 드래그가 종료되었을 때 콜백 함수를 호출.
    } else {
      onDragging && onDragging(newItems); // 항목이 드래그 중일 때 콜백 함수를 호출.
    }
  };
  useEffect(() => {
    setCurrentItems(dragList);
  }, [dragList]);

  // 각 항목을 랜더링.
  return (
    <DndProvider backend={HTML5Backend}>
      {currentItems.map((item, idx) => (
        <DraggableItem
          key={item.id}
          dragItem={item}
          itemIndex={idx}
          onMove={handleItemMove}
          itemRenderer={children}
          dragSectionName={dragSectionName}
        />
      ))}
    </DndProvider>
  );
};

// 드래그 가능한 항목 컴포넌트를 정의
const DraggableItem = ({
  dragItem,
  itemIndex,
  onMove,
  itemRenderer,
  dragSectionName,
}: DraggableItemProps) => {
  const { ref, isDragging } = useDnD({ itemIndex, onMove, dragSectionName }); // useDnD 훅을 사용하여 드래그 앤 드랍을 처리.
  return itemRenderer(dragItem, ref, isDragging); // 항목 랜더링.
};
