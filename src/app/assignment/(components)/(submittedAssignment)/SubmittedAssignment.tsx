"use client";

import useGetSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import React from "react";
import Card from "../Card";
import Image from "next/image";
import Link from "next/link";

const SubmittedAssignment = () => {
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading, error } = useGetSubmittedAssignment(docId);

  if (isLoading) return <div>Loading...</div>;
  return (
    data && (
      <Card vertical={true}>
        <div className="flex justify-start items-center gap-[10px] mb-[21px]">
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

        {/* TODO: link 사이 gap 지정 필요 */}
        {data[0].links && data[0].links[0].length ? (
          <div className="flex flex-col">
            {data[0].links.map(link => (
              <Link
                href={link}
                target="_blank"
                className="text-primary-100 text-base underline"
              >
                {link}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[12.36px]">
            {data[0].attachmentFiles.map(file => (
              <div className="flex items-center gap-[13.32px] font-bold text-primary-80">
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
      </Card>
    )
  );
};

export default SubmittedAssignment;
