"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface iFile {
  name: string;
  url: string;
}

export default function Upload() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<iFile>();
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const onChangeFiles = useCallback((e: DragEvent): void => {
    if (e.dataTransfer !== null) {
      setFiles({
        name: e.dataTransfer.files[0].name,
        url: URL.createObjectURL(e.dataTransfer.files[0]),
      });
    }
  }, []);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback(() => {
    dragRef.current?.addEventListener("dragenter", handleDragIn);
    dragRef.current?.addEventListener("dragleave", handleDragOut);
    dragRef.current?.addEventListener("dragover", handleDragOver);
    dragRef.current?.addEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    dragRef.current?.removeEventListener("dragenter", handleDragIn);
    dragRef.current?.removeEventListener("dragleave", handleDragOut);
    dragRef.current?.removeEventListener("dragover", handleDragOver);
    dragRef.current?.removeEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div>
      {files ? <p>{files.name}</p> : null}
      <label
        htmlFor="fileUpload"
        ref={dragRef}
        className={`w-[707px] ${
          files ? "h-[214px]" : "h-[298px]"
        } border-dashed border border-grayscale-20 rounded-lg flex justify-center items-center flex-col`}
      >
        <p className="text-grayscale-30">파일을 여기로 드래그 해주세요</p>
        <button
          onClick={() => dragRef.current?.click()}
          className="w-[200px] h-[38px] bg-grayscale-5 rounded-lg text-grayscale-50"
        >
          컴퓨터에서 파일 선택
        </button>
      </label>
      <input type="file" id="fileUpload" className="opacity-0" />
    </div>
  );
}
