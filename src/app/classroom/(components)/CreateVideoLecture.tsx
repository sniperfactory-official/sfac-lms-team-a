"use client";

import Upload from "@/components/upload/Upload";
import React, { useEffect, useState } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function CreateVideoLecture({ setLecture }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (files.length !== 0) {
      setLecture(prev => {
        return {
          ...prev,
          lectureContent: { ...prev.lectureContent, video: files },
        };
      });
    }
  }, [setLecture, files]);

  return (
    <div>
      <Upload role="lecture" files={files} setFiles={setFiles} />
    </div>
  );
}
