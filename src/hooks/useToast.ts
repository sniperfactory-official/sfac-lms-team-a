import { useState, useEffect } from "react";

export interface ToastProps {
  type: "Simple" | "Success" | "Error" | "With Action" | "With Title";
  // button?: boolean;
  // title?: string;
  text: string;
}

export const useToast = () => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);
  const handleCloseToast = () => setToastProps(null);

  useEffect(() => {
    if (toastProps) {
      // 클릭 이벤트가 발생하면 토스트를 닫는다.
      const handleWindowClick = () => {
        handleCloseToast();
      };

      window.addEventListener("click", handleWindowClick);

      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [toastProps]);

  return { toastProps, setToastProps };
};
