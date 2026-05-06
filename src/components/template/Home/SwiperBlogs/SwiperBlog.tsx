import Image from "next/image";
import React from "react";

export default function SwiperBlog({ title, coverImage }) {
  return (
    <div className="bg-white shadow-xl p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed">
      <div>
        <Image width={200} height={200} src={coverImage} alt="" />
      </div>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
