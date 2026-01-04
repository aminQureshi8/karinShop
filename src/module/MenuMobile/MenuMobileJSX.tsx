"use client";

import { useSelector } from "react-redux";

export default function MenuMobileJSX() {
  const isOpen = useSelector((state) => state.menuMobile.isOpen);
  return (
    <div className={`fixed ${isOpen ? "bg-white" : ""} -z-10  inset-0`}>
      cccc
    </div>
  );
}
