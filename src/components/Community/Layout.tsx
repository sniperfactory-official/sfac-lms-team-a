"use client";
import { useState } from "react";
import Inputbar from "@/components/Community/Inputbar";
import ModalWrapper from "@/components/ModalWrapper";
import PostContent from "@/components/Community/PostContent";

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-[400px] bg-orange-100">
      <div className="flex ">
        <div className="bg-emerald-200 w-[300px] h-[400px]">사이드바 영역</div>
        <div className="bg-indigo-100 w-[600px] h-[400px]">글 목록 영역</div>
      </div>
      {isModalOpen && (
        <ModalWrapper
          modalTitle="글 남기기"
          handleModal={() => setIsModalOpen(!isModalOpen)}
          children={<PostContent />}
        />
      )}
      <div
        className="absolute inset-x-1/4 inset-y-2/4 cursor-pointer"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <Inputbar />
      </div>
    </div>
  );
}
