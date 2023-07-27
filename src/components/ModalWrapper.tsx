"use client";

import React, { useEffect } from "react";

interface ModalWrapperPropsType {
  modalTitle?: React.ReactNode;
  handleModal: () => void;
  cleanUp?: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({
  modalTitle,
  handleModal,
  cleanUp,
  children,
}: ModalWrapperPropsType) => {
  const handleBubbling = (e: React.MouseEvent) => e.stopPropagation();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      cleanUp && cleanUp();
    };
  }, [cleanUp]);
  return (
    <>
      <div className="fixed z-10 inset-0 bg-black opacity-20" />
      <div
        onClick={handleModal}
        className="fixed z-20 inset-0 flex overscroll-none overflow-y-auto p-[35px]"
      >
        <div
          className="m-auto relative w-[770px] min-h-[168px] border-2 shadow-md bg-white rounded-lg p-6"
          onClick={handleBubbling}
        >
          <div
            className={`flex ${modalTitle ? "justify-between" : "justify-end"}`}
          >
            {modalTitle && (
              <h2 className="font-[700] text-[20px] leading-[23.87px] tracking-[-2%]">
                {modalTitle}
              </h2>
            )}
            <button
              onClick={handleModal}
              className="w-[24px] h-[24px] text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1743_22123)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.07095 18.8224C3.84417 19.128 3.86937 19.5618 4.14655 19.8389C4.45144 20.1438 4.94578 20.1438 5.25068 19.8389L11.9727 13.1169L18.6947 19.839C18.9996 20.1439 19.4939 20.1439 19.7988 19.839C20.076 19.5618 20.1012 19.128 19.8744 18.8224L19.7988 18.7348L13.0644 12L19.7988 5.26523C20.076 4.98805 20.1012 4.55431 19.8744 4.24866L19.7988 4.1611C19.5216 3.88392 19.0879 3.85872 18.7822 4.0855L18.6947 4.1611L11.9727 10.8831L5.25068 4.16107L5.16311 4.08548C4.85747 3.85869 4.42373 3.88389 4.14655 4.16107L4.07095 4.24863C3.84417 4.55428 3.86937 4.98802 4.14655 5.2652L10.881 12L4.14655 18.7348L4.07095 18.8224Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1743_22123">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
