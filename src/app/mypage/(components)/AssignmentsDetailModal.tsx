"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Timestamp } from "firebase/firestore";

type FilteredAssignments = {
  id: string;
  title: string;
  content: string[];
  attachmentFiles?: Array<{ name: string; url: string }>;
  category: string;
  createdAt: Timestamp;
};
interface AssignmentsDetailModalProps {
  id: string;
  filteredAssignments: FilteredAssignments[];
}

const AssignmentsDetailModal = ({
  id,
  filteredAssignments,
}: AssignmentsDetailModalProps) => {
  const targetAssignments = filteredAssignments.find(item => item.id === id);

  if (!targetAssignments) return null;

  return (
    <div className="w-full">
      <div
        key={targetAssignments.id}
        className="h-44 text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3"
      >
        <div className="flex mb-3.5 ">
          <div className="align-middle px-[5px] leading-5 text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
            {targetAssignments.category}
          </div>
          <h4 className="text-sm">{targetAssignments.title}</h4>
        </div>
        <div className="truncate overflow-hidden ...">
          {targetAssignments.content &&
            targetAssignments.content.map((item, idx) => (
              <Link key={idx} href={item} className="text-primary-100">
                {item}
              </Link>
            ))}
           {targetAssignments.attachmentFiles &&
            targetAssignments.attachmentFiles.length > 0 &&
            targetAssignments.attachmentFiles.filter(item => item.url !== "")
              .length > 0 &&
            targetAssignments.attachmentFiles
              .filter(item => item.url !== "")
              .map((item, idx) => (
                <Link key={idx} href={item.url} className="text-primary-100">
                  첨부파일 : {item.name}
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};
export default AssignmentsDetailModal;
