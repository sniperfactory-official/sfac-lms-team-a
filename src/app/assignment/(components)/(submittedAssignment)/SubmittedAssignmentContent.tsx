"use client";
import React from "react";
import Card from "../Card";
import Image from "next/image";
import Link from "next/link";
import { getTime } from "@/utils/getTime";
import { Timestamp } from "firebase/firestore";
import { AttachmentFile, User } from "@/types/firebase.types";
import { useAppSelector } from "@/redux/store";
import useDeleteSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useDeleteSubmittedAssignment";
import { useParams } from "next/navigation";

interface SubmittedAssignmentProps {
  data:
    | {
        user: User | undefined;
        attachmentFiles: AttachmentFile[];
        links: string[];
        createdAt: Timestamp;
      }[]
    | undefined;
  feedbackLength?: number;
  submittedAssignmentId: string;
  handleModal?: () => void;
}

const SubmittedAssignmentContent = ({
  data,
  feedbackLength,
  submittedAssignmentId,
  handleModal,
}: SubmittedAssignmentProps) => {
  const userData = useAppSelector(state => state.userInfo);
  const params = useParams();
  const deleteAssignmentMutation = useDeleteSubmittedAssignment(
    Array.isArray(params) ? params[0].assignmentId : params.assignmentId,
    userData.id,
  );

  const handleDelete = () => {
    deleteAssignmentMutation.mutate(submittedAssignmentId);

    window.alert("과제 삭제 완료");
    if (handleModal) handleModal();
  };

  if (!data) return <div>조회된 과제가 없습니다.</div>;
  return (
    <Card vertical={true}>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-[10px]">
          <div
            className={`w-[43px] h-[43px] flex justify-center items-center border border-gray-100 rounded-full${
              data[0].user?.profileImage ? " relative overflow-hidden" : ""
            }`}
          >
            {data[0].user?.profileImage ? (
              <Image
                src={data[0].user?.profileImage}
                alt="프로필사진"
                fill
                objectFit="cover"
              />
            ) : (
              <Image
                src={"/images/logo.svg"}
                alt="프로필사진"
                width={21.51}
                height={11.57}
              />
            )}
          </div>
          <div className="flex items-center gap-[5px]">
            <span className="font-bold text-base">
              {data[0].user?.username}
            </span>
            <div className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
            <span className="text-grayscale-40 text-base">
              {data[0].user?.role}
            </span>
          </div>
        </div>
        {userData.username === data[0].user?.username && !feedbackLength && (
          <button className="text-xs" onClick={() => handleDelete()}>
            삭제
          </button>
        )}
      </div>
      {data[0].links && data[0].links[0].length ? (
        <div className="flex flex-col gap-[10px] mt-[8.92px] mb-[57.08px]">
          {data[0].links.map((link, idx) => (
            <Link
              key={idx}
              href={link}
              target="_blank"
              className="text-primary-100 text-base underline"
            >
              {link.slice(0, 40)}...
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-[21px] mb-[2px]">
          {data[0].attachmentFiles.map((file, idx) => (
            <Link
              href={file.url}
              target="_blank"
              className="flex items-center gap-[13.32px] font-bold text-primary-80 w-fit cursor-pointer"
              key={idx}
            >
              <Image
                src={"/images/clip.svg"}
                alt="clip"
                width={36.68}
                height={39.64}
              />
              <span>{file.name}</span>
            </Link>
          ))}
        </div>
      )}
      <div className="text-right text-xs text-grayscale-40">
        {getTime(data[0].createdAt.toDate())}
      </div>
    </Card>
  );
};

export default SubmittedAssignmentContent;
