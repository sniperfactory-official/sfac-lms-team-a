"use client";
import { useState, useEffect } from "react";
import Inputbar from "./Inputbar";
import ModalWrapper from "@/components/ModalWrapper";
import PostForm from "./PostForm/PostForm";
import CommunityList from "./CommunityList";
import CommunityModal from "../CommunityModal/CommunityModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { notChoicePost } from "@redux/postSlice";

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const postInfo = useAppSelector(state => state.postInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(postInfo);
    if (postInfo.postId) {
      if (postInfo.type === "update") {
        setIsModalOpen(!isModalOpen);
        // console.log("update");
      } else {
        // console.log("detail");
        setIsCommunityModalOpen(true);
      }
    }
  }, [postInfo, isCommunityModalOpen]);

  const [cleanup, setCleanup] = useState<(() => void) | undefined>(undefined);
  const onCloseCommunityModal = () => {
    setIsCommunityModalOpen(!isCommunityModalOpen);
    dispatch(notChoicePost());
  };

  const onCloseForm = () => {
    setIsModalOpen(false);
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
          modalTitle={postInfo.postId === "" ? "글 남기기" : "수정하기"}
          onCloseModal={onCloseForm}
          children={<PostForm onClose={onCloseForm} onCleanup={setCleanup} />}
          unmountCleanUp={cleanup}
        />
      )}
      <Inputbar handleClick={handleInputbarClick} />
      {isCommunityModalOpen && (
        <ModalWrapper
          modalTitle="상세보기"
          onCloseModal={onCloseCommunityModal}
          children={<CommunityModal />}
        />
      )}
    </div>
  );
}
