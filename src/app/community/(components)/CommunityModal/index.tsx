"use client";

import { useState } from "react";
import CommunityModal from "./CommunityModal";
import ModalWrapper from "@/components/ModalWrapper";

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const onCloseModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      {isModalOpen && (
        <ModalWrapper
          modalTitle="상세보기"
          onCloseModal={onCloseModal}
          children={<CommunityModal />}
        />
      )}
    </div>
  );
}
