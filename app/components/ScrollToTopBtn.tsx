import { useEffect, useState } from "react";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const ScrollToTopBtn = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollPosition);

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={` left-0 bottom-10 z-50 bg-[#ffc53d] text-[#21201c] rounded-tr-full p-3 md:p-4 rounded-br-full ${
        scrollPosition > 300 ? "fixed" : "hidden"
      }`}
    >
      <TbArrowBigUpLinesFilled size="35px" />
    </button>
  );
};

export default ScrollToTopBtn;
