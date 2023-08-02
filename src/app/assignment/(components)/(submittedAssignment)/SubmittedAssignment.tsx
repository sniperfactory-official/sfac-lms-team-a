"use client";

import useGetSubmittedAssignment from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import React from "react";
import Card from "../Card";
import Image from "next/image";

const SubmittedAssignment = () => {
  const docId = "gZWELALnKoZLzJKjXGUM";
  const { data, isLoading, error } = useGetSubmittedAssignment(docId);

  if (isLoading) return <div>Loading...</div>;
  return (
    data && (
      <Card>
        <div>
          <div className="w-[43px] h-[43px] flex justify-center items-center border border-gray-100 rounded-full">
            <Image
              src={data[0].user?.profileImage || "/images/logo.svg"}
              alt="프로필사진"
              width={21.51}
              height={11.57}
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default SubmittedAssignment;
