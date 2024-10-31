import { Flex } from "@radix-ui/themes";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useToast } from "../contexts/ToastContext";

const Toast = () => {
  const { showToast, setShowToast, currentPath } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <div
      className={`transition-[.3s] text-[#21201c] bg-[#ffcd53] absolute top-0 rounded max-w-[50rem] left-[50%] p-4 -translate-x-[50%] ${
        showToast
          ? "max-h-[initial] opacity-1 translate-y-6"
          : "max-h-0 opacity-0 -translate-y-6 -z-10 "
      }`}
    >
      <Flex align="center" gap="2">
        <FaCheckCircle />
        Added to your watch list
      </Flex>
    </div>
  );
};

export default Toast;
