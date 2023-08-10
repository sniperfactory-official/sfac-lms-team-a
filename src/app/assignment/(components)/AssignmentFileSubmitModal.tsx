import React, { useState } from "react";
import { AssignmentSubmitModalProps } from "./AssignmentLinkSubmitModal";
import Upload from "@/components/upload/Upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  createAttachment,
  createSubmittedAssignment,
} from "@/hooks/reactQuery/submittedAssignment/useCreateSubmittedAssignment";
import { AttachmentFile } from "@/types/firebase.types";
import { useGetSubmittedAssignmentId } from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignementId";

const AssignmentFileSubmitModal = ({
  handleModalState,
  assignmentId,
  userId,
}: AssignmentSubmitModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { refetch } = useGetSubmittedAssignmentId(assignmentId, userId);

  const storage = getStorage();

  const uploadAssignmentFiles = async (files: File[]) => {
    const uploadedFiles: AttachmentFile[] = [];

    for (const file of files) {
      try {
        const storageRef = ref(storage, `attachments/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(snapshot.ref);

        uploadedFiles.push({
          name: file.name,
          url: downloadURL,
        });
      } catch (error) {
        console.error("파일 업로드 에러:", error);
      }
    }

    return uploadedFiles;
  };

  const submitAssignmentFiles = async (
    assignmentId: string,
    userId: string,
    uploadedAssignmentFiles: AttachmentFile[],
  ) => {
    try {
      const submittedAssignmentId = await createSubmittedAssignment(
        assignmentId,
        userId,
      );

      const response = await createAttachment(
        submittedAssignmentId,
        userId,
        undefined,
        uploadedAssignmentFiles,
      );

      console.log("과제 파일 제출: ", response);
      window.alert("과제 제출이 완료되었습니다.");
      refetch();
      handleModalState();
    } catch (error) {
      console.error("과제 제출 에러:", error);
    }
  };

  const handleSubmit = async () => {
    const uploadedAssignmentFiles = await uploadAssignmentFiles(files);
    await submitAssignmentFiles(assignmentId, userId, uploadedAssignmentFiles);
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-6">과제 제출</h1>
      <Upload role="assignment" files={files} setFiles={setFiles} />
      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          className="text-center bg-grayscale-5 font-bold text-grayscale-60 w-[115px] h-[35px] rounded-[7px]"
          onClick={handleModalState}
        >
          취소
        </button>
        <button
          className="text-center bg-primary-80 font-bold text-white w-[115px] h-[35px] rounded-[7px]"
          onClick={handleSubmit}
        >
          업로드
        </button>
      </div>
    </div>
  );
};

export default AssignmentFileSubmitModal;
