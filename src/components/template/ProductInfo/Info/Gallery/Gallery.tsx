"use client"

import Image from "next/image";
import { useState } from "react";
import ModalSwiper from "../ModalSwiper/ModalSwiper";



export default function Gallery({ images }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <Image src={images[0]} width={300} height={300} alt="Product" />
      </div>

      {
        <ModalSwiper images={images} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      }
    </div>
  )
}
