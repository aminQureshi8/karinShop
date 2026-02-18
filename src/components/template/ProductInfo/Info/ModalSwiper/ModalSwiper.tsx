'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/thumbs'

export default function ModalSwiper({
  isOpen,
  onClose,
  images,
  title,
}: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  if (!isOpen) return null

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative w-full max-w-2xl scale-100 p-4">
        <div className="rounded-xl border border-gray-500 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
          <div className="flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-600">
            <h3 className="text-lg font-medium">تصاویر</h3>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-base hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IoMdClose className="h-5 w-5" />
            </button>
          </div>

          <div className="py-6">
            <Swiper
              modules={[Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed
                    ? thumbsSwiper
                    : null,
              }}

              slidesPerView={1}
              centeredSlides
              className="w-full"
            >
              {images?.map((img: string, index: number) => (
                <SwiperSlide
                  key={index}
                  className="!flex items-center justify-center"
                >
                  <div className="relative w-full max-w-md aspect-[3/4]">
                    <Image
                      src={img}
                      alt={title ?? 'product image'}
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              slidesPerView="auto"
              spaceBetween={12}
              watchSlidesProgress
              className="mt-4"
            >
              {images?.map((img: string, index: number) => (
                <SwiperSlide
                  key={index}
                  className="!w-20 !h-28 cursor-pointer"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-md border dark:border-gray-700">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}
