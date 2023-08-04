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
  const postInfo = useAppSelector(state => state.postInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(postInfo);
    if (postInfo.postId) {
      if (postInfo.type === "update") {
        setIsModalOpen(!isModalOpen);
        console.log('update')
      }
      else {
        console.log('detail')
        setIsCummunityModalOpen(true);
      }
    } 
  }, [postInfo, isCummunityModalOpen]);

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
          onCloseModal={() => {setIsModalOpen(!isModalOpen);dispatch(notChoicePost());}}
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
