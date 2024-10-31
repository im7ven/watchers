"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastContextValue = {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  currentPath: string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const currentPath = usePathname();
  const regex: RegExp = /^\/(tv|movie)\/\d+$/;
  const isMediaPath = regex.test(currentPath);

  useEffect(() => {
    if (!isMediaPath) {
      setShowToast(false);
    }
  }, [currentPath]);

  return (
    <ToastContext.Provider value={{ showToast, setShowToast, currentPath }}>
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
