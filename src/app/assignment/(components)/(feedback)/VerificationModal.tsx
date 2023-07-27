import React from "react";

interface VerificationModalProps {
  handleModalOn: () => void;
  handleDeleteFeedback: (e: React.MouseEvent) => void;
  id: string;
}

const VerificationModal = ({
  handleModalOn,
  id,
  handleDeleteFeedback,
}: VerificationModalProps) => {
  return (
    <dialog className="rounded-[10px] w-[345px] h-[117px] shadow-4dp flex flex-col justify-center p-5 gap-1.5 m-0 absolute bottom-[3%] left-[3%]">
      <header>
        <h1 className="font-[700]">삭제하시겠습니까?</h1>
      </header>
      <p className="text-[12px]">한번 삭제하시면 다시 복구가 불가능합니다.</p>
      <footer className="flex flex-row gap-3 justify-end pt-1">
        <button
          id={id}
          className="rounded-[10px] bg-grayscale-5 text-grayscale-50 px-8 py-1.5"
          onClick={handleModalOn}
        >
          취소
        </button>
        <button
          id={id}
          className="rounded-[10px] bg-primary-80 text-white px-8 py-1.5"
          onClick={handleDeleteFeedback}
        >
          확인
        </button>
      </footer>
    </dialog>
  );
};

export default VerificationModal;
