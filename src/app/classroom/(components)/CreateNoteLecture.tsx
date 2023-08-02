"use client";

import React, { useEffect, useState } from "react";
import { CreateLecture } from "./CreateLecture";
import MDEditor from "@uiw/react-md-editor";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function CreateNoteLecture({ setLecture }: Props) {
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
  }, [setLecture]);

  return (
    <div className="container" data-color-mode="light">
      <MDEditor value={text} onChange={setText} height={300} />
    </div>
  );
}
