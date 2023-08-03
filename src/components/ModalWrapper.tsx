import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "/public/images/close.svg";

interface ModalWrapperProps {
  width?: string;
  isCloseButtonVisible?: boolean;
  modalTitle?: React.ReactNode;
  onCloseModal: () => void;
  unmountCleanUp?: () => void;
  children: React.ReactNode;
  isWrapperNoPadding?: boolean;
}

const ModalWrapper = ({
  width = "770px",
  isCloseButtonVisible = true,
  modalTitle,
  onCloseModal,
  unmountCleanUp,
  children,
  isWrapperNoPadding,
}: ModalWrapperProps) => {
  const [startOutside, setStartOutside] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setStartOutside(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && startOutside) {
      onCloseModal();
    }
    setStartOutside(false);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      unmountCleanUp && unmountCleanUp();
    };
  }, [unmountCleanUp]);
  return (
    <>
      <div className="fixed z-10 inset-0 bg-[rgba(0,0,0,0.3)]" />
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="fixed z-20 inset-0 flex overscroll-none overflow-y-auto py-[40px] px-[35px]"
      >
        <div
          className={`m-auto relative w-[${width}] min-h-[168px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] bg-white rounded-[10px] border border-solid border-[rgba(230,230,230,1)] ${
            !isWrapperNoPadding ? "p-6" : "p-0 overflow-hidden"
          }`}
        >
          <div
            className={`flex ${
              modalTitle ? "justify-between" : "justify-end"
            } ${!isWrapperNoPadding ? "" : "absolute right-5 top-5"}`}
          >
            {modalTitle && (
              <h2 className="font-[700] text-[20px] leading-[23.87px] tracking-[-2%]">
                {modalTitle}
              </h2>
            )}
            {isCloseButtonVisible && (
              <button
                onClick={onCloseModal}
                className="z-20 w-[24px] h-[24px] text-gray-500"
              >
                <Image className="cursor-pointer" src={close} alt="닫기" />
              </button>
            )}
          </div>
          <>{children}</>
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
