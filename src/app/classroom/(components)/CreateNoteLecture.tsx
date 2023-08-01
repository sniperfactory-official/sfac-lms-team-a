"use client";

import { LectureContent } from "@/types/firebase.types";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function CreateNoteLecture({ setLecture }: Props) {
  const [text, setText] = useState<string | undefined>("");
  const [lectureContent, setLectureContent] = useState<LectureContent>({
    images: [],
    textContent: "",
    externalLink: "",
    videoUrl: "",
    videoLength: 0,
  });

  useEffect(() => {
    if (text !== undefined) {
      setLectureContent(prev => {
        return { ...prev, textContent: text };
      });
    }
  }, [setLectureContent, text]);

  useEffect(() => {
    setLecture(prev => {
      return { ...prev, lectureContent: lectureContent };
    });
  }, [setLecture, lectureContent]);

  return (
    <div className="container" data-color-mode="light">
      <MDEditor value={text} onChange={setText} height={300} />
    </div>
  );
}
