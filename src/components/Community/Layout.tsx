"use client";
import { useState, useEffect } from "react";
import Inputbar from "@/components/Community/Inputbar";
import ModalWrapper from "@/components/ModalWrapper";
import PostForm from "@/components/Community/PostForm";
import CommunityList from "@/components/Community/CommunityList";
import CommunityModal from "../CommunityModal/CommunityModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { notChoicePost } from "@redux/postSlice"; // import the actions from your slice

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCummunityModalOpen, setIsCummunityModalOpen] = useState(false);
  // const [selectedPost, setSelectedPost] = useState("");
  const postId = useAppSelector(state => state.postId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(postId);
    if (postId) {
      setIsCummunityModalOpen(true);
    }
  }, [postId, isCummunityModalOpen]);

  const [cleanup, setCleanup] = useState<(() => void) | undefined>(undefined);
  const onCloseModal = () => {
    setIsCummunityModalOpen(!isCummunityModalOpen);
    dispatch(notChoicePost());
  };

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
      {isCummunityModalOpen && (
        <ModalWrapper
          modalTitle="상세보기"
          onCloseModal={onCloseModal}
          children={<CommunityModal />}
        />
      )}
    </div>
  );
}
