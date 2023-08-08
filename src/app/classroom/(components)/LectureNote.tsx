"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { CreateLecture } from "./CreateLecture";
import MDEditor from "@uiw/react-md-editor";
import uploadFileToStorage from "@/utils/uploadFileToStorage";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function LectureNote({ setLecture }: Props) {
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (text !== undefined) {
      setLecture(prev => {
        return {
          ...prev,
          lectureContent: { ...prev.lectureContent, textContent: text },
        };
      });
    }
  }, [setLecture, text]);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFileToStorage("lectures/noteImages/", file);
      setText(prev => prev + `\n![Alt Text](${imageUrl})`);
    } catch (error) {
      console.error("Failed to upload Image", error);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="container w-[700px]" data-color-mode="light">
      <MDEditor value={text} onChange={setText} height={300} />
      <label
        htmlFor="editorImage"
        className="mt-[12px] flex justify-center items-center w-[115px] h-[35px] rounded-[10px] bg-primary-80 text-white cursor-pointer"
      >
        사진 추가
      </label>
      <input
        id="editorImage"
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
      />
    </div>
  );
}
