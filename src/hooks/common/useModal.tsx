import React, { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return { isModalOpen, handleModal };
};

export default useModal;
