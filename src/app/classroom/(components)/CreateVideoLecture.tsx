"use client";

import Upload from "@/components/upload/Upload";
import {
  AttachmentFile,
  Lecture,
  LectureContent,
} from "@/types/firebase.types";
import React, { useEffect, useState } from "react";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function CreateVideoLecture({ setLecture }: Props) {
  const [files, setFiles] = useState<AttachmentFile[]>([]);
  const [lectureContent, setLectureContent] = useState<LectureContent>({
    images: [],
    textContent: "",
    externalLink: "",
    videoUrl: "",
    videoLength: 0,
  });

  useEffect(() => {
    if (files.length !== 0) {
      setLectureContent(prev => {
        return { ...prev, videoUrl: files[0].url };
      });
    }
  }, [files, setLectureContent]);

  useEffect(() => {
    setLecture(prev => {
      return { ...prev, lectureContent: lectureContent };
    });
  }, [setLecture, lectureContent]);

  return (
    <div>
      <Upload role="lecture" files={files} setFiles={setFiles} />
    </div>
  );
}
