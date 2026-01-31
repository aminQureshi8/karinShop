import Image from "next/image";
import React from "react";

export default function SwiperSlideBrand({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  console.log(imageUrl);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl px-4">
      <Image
        alt={title}
        src="http://185.204.197.79/Brand/apple.png"
        width={150}
        height={150}
        className="!h-[100px]"
      />
    </div>
  );
}
