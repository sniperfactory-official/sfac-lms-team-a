"use client";

import useGetSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import React from "react";
import Card from "../Card";
import Image from "next/image";
import Link from "next/link";
import { getTime } from "@/utils/getTime";
import { downloadAssignmentFile } from "@/utils/downloadAssignmentFile";

const SubmittedAssignment = ({ documentId }: { documentId: string }) => {
  // const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading, error } = useGetSubmittedAssignment(documentId);

  if (isLoading) return <div>Loading...</div>;
  return (
    data && (
      <Card vertical={true}>
        <div className="flex justify-start items-center gap-[10px]">
          <div className="w-[43px] h-[43px] flex justify-center items-center border border-gray-100 rounded-full">
            <Image
              src={data[0].user?.profileImage || "/images/logo.svg"}
              alt="프로필사진"
              width={21.51}
              height={11.57}
            />
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
              <div
                className="flex items-center gap-[13.32px] font-bold text-primary-80 w-fit cursor-pointer"
                key={idx}
                onClick={() => downloadAssignmentFile(file.name)}
              >
                <Image
                  src={"/images/clip.svg"}
                  alt="clip"
                  width={36.68}
                  height={39.64}
                />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-right text-xs text-grayscale-40">
          {getTime(data[0].createdAt.toDate())}
        </div>
      </Card>
    )
  );
};

export default SubmittedAssignment;
