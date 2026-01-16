import Image from "next/image";
import React from "react";

export default function SwiperSlideBrand() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl px-4 shadow-2xl">
      <Image alt="" src="/image/asus.png" width={150} height={150} className="!h-[100px]" />
    </div>
  );
}
