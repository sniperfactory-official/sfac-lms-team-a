"use client";
import { useState } from "react";
import Inputbar from "@/components/Community/Inputbar";
import ModalWrapper from "@/components/ModalWrapper";
import PostForm from "@/components/Community/PostForm";
import CommunityList from "@/components/Community/CommunityList";

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cleanup, setCleanup] = useState<(() => void) | undefined>(undefined);

  const handleInputbarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      <Inputbar onClick={handleInputbarClick} />
    </div>
  );
}
