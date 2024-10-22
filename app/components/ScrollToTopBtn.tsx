import React from "react";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const ScrollToTopBtn = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed left-0 bottom-10 bg-[#ffc53d] text-[#21201c] rounded-tr-full p-3 md:p-4 rounded-br-full "
    >
      <TbArrowBigUpLinesFilled size="35px" />
    </button>
  );
};

export default ScrollToTopBtn;
