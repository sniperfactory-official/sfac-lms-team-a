import React, { useEffect, useState } from "react";
// import { Toast } from "sfac-designkit-react";

type ToastProps = {
  type: "Success" | "Error";
  message: string;
  duration?: number;
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  type,
}) => {
  const [opacity, setOpacity] = useState("opacity-0");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setOpacity("opacity-100");
    const timer = setTimeout(() => {
      setVisible(false);
      setOpacity("opacity-0");
      onClose(); // 외부에서 토스트 상태를 변경하기 위한 콜백
    }, duration);

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration + 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <>
      {/* 디자인시스템 토스트 알람 사용할 경우 */}
      {/* <div
        className={`absolute bottom-2 left-0 transition-opacity duration-300 ease-in-out ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      > */}
      {/* {type === "Success" ? (
          <Toast type="Success" text={message}></Toast>
        ) : (
          <Toast type="Error" text={message}></Toast>
        )} */}
      {/* </div> */}

      <div
        className={`w-[357.68px] text-[14px] absolute border bottom-2 left-0 rounded-[10px] pl-5 py-[15.5px] shadow-toast transition-opacity duration-300 ease-in-out ${opacity}
        ${!visible ? "pointer-events-none" : "pointer-events-auto"}
          ${
            type === "Success"
              ? "bg-[#F5FBF6] border-[#07A320] text-[#07A320]"
              : "bg-[#FFF5F5] border-[#FF0000] text-[#FF0000]"
          }`}
      >
        {message}
      </div>
    </>
  );
};
