import { ToastProps } from "sfac-designkit-react/dist/Toast";
import { useState, useEffect } from "react";

export const useToast = () => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);
  const handleCloseToast = () => setToastProps(null);

  useEffect(() => {
    if (toastProps) {
      // 3초 후에 토스트 닫기
      const timer = setTimeout(() => {
        handleCloseToast();
      }, 3000);

      // 클릭 이벤트가 발생하면 토스트를 닫기
      const handleWindowClick = () => {
        clearTimeout(timer);
        handleCloseToast();
      };

      window.addEventListener("click", handleWindowClick);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [toastProps]);

  return { toastProps, setToastProps };
};
