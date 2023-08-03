"use client";
import { useState } from "react";
import Inputbar from "@/components/Community/Inputbar";
import ModalWrapper from "@/components/ModalWrapper";
import PostForm from "@/components/Community/PostForm";
import CommunityList from "@/components/Community/CommunityList";

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cleanup, setCleanup] = useState<(() => void) | undefined>(undefined);

  return (
    <div className="w-full">
      <div className="flex  justify-center items-center ">
        <CommunityList />
      </div>
      {isModalOpen && (
        <ModalWrapper
          modalTitle="글 남기기"
          onCloseModal={() => setIsModalOpen(!isModalOpen)}
          children={
            <PostForm
              onClose={() => setIsModalOpen(false)}
              onCleanup={setCleanup}
            />
          }
          unmountCleanUp={cleanup}
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
