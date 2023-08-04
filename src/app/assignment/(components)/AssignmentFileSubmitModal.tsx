import React, { useState } from "react";
import { AssignmentSubmitModalProps } from "./AssignmentLinkSubmitModal";
import Upload from "@/components/upload/Upload";

const AssignmentFileSubmitModal = ({
  handleModalState,
}: AssignmentSubmitModalProps) => {
  const [files, setFiles] = useState<File[]>([]);

  console.log(files);
  return (
    <div>
      <h1 className="font-bold text-xl mb-6">과제 제출</h1>
      <Upload role="assignment" files={files} setFiles={setFiles} />
    </div>
  );
};

export default AssignmentFileSubmitModal;
