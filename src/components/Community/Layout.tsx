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
      {isCummunityModalOpen && (
        <ModalWrapper
          modalTitle="상세보기"
          onCloseModal={onCloseModal}
          children={<CommunityModal />}
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
