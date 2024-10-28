"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ToastContextValue = {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  console.log("ToastContextProvider rendered");

  return (
    <ToastContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("Toast Context must be used within ToastContextProvider");
  }
  return context;
};
