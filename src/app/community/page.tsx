"use client";

import Layout from "@/components/Community/Layout";
import CommunityModal from "@/components/CommunityModal/CommunityModal";
import ModalWrapper from "@/components/ModalWrapper";
import { useState } from "react";

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
