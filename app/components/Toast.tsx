import React, { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";

const Toast = ({ message }: { message: string }) => {
  const { showToast, setShowToast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showToast, setShowToast]);

  return (
    <div className="px-4">
      <div
        className={`transition-[.3s] text-[#21201c] bg-[#ffcd53] absolute top-0 rounded max-w-[50rem] left-[50%] p-4 -translate-x-[50%] ${
          showToast
            ? "max-h-[initial] opacity-1 translate-y-6"
            : "max-h-0 opacity-0 -translate-y-6 -z-10 "
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
