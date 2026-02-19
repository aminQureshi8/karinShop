"use client"

import Image from "next/image";
import { useState } from "react";
import ModalSwiper from "../ModalSwiper/ModalSwiper";

export default function Gallery({ images }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <Image src={images[0]} width={350} height={300} alt="Product" />
      </div>
      <div className="flex justify-center mt-3 gap-5">
        {
          images.slice(0, 3).map((img: string, index: number) =>
            <div onClick={() => setIsOpen(true)} key={index} className="cursor-pointer border-2 dark:border-gray-700 border-gray-300 rounded-lg p-2 flex justify-center ">
              <Image src={img} width={50} height={50} alt="Product" />
            </div>
          )
        }
      </div>
      {
        <ModalSwiper images={images} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      }
    </div>
  )
}
