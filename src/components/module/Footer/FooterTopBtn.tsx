"use client";
import { BiArrowToTop } from "react-icons/bi";

export default function FooterTopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button
        onClick={scrollToTop}
        className="text-white text-sm flex items-center  gap-3 border-2 p-2 rounded-xl border-gray-600"
      >
        <span>بازگشت به بالا</span>
        <BiArrowToTop size={19} />
      </button>
    </div>
  );
}
