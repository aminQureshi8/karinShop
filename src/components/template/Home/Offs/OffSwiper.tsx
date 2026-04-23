"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import TimerSlide from "./TimerSlide";

export default function OffSwiper({ products, dateTime }: { products: any }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-12 bg-blue-600 rounded-2xl font-danaMed p-4 h-[320px]">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation
        onBeforeInit={(swiper: any) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: {
            spaceBetween: 8,
          },
          640: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 16,
          },
          1024: {
            spaceBetween: 20,
          },
        }}
        className="!px-2 !h-full rounded-xl"
      >
        <SwiperSlide className="!w-56">
          <TimerSlide endTime={dateTime} />
        </SwiperSlide>

        {products.map((product) => (
          <SwiperSlide className="!w-64 !h-full">
            <div className="bg-white cursor-pointer  dark:bg-slate-800 dark:text-white rounded-xl p-3 h-full flex flex-col justify-between">
              <Link href={`/productInfo/${product._id}`}>
                <Image
                  width={100}
                  height={100}
                  src={product.mainImage}
                  alt={product.title}
                  className="w-full h-42 object-contain"
                />
              </Link>

              <p className="text-sm mt-3 line-clamp-2">{product.title}</p>

              <div className="mt-3 flex justify-between items-center border-t-2 pt-2 border-gray-200 dark:border-gray-700">
                <span className="text-xs ss02 text-white bg-blue-500 px-2 py-1 rounded">
                  {product.off?.percent}٪
                </span>
                <span className="text-sm ss02">
                  {product.price.toLocaleString()} تومان
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div>
          <button
            ref={prevRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 max-sm:size-8 size-12 rounded-full flex items-center justify-center shadow-lg transition-all"
            aria-label="اسلاید بعدی"
          >
            <MdKeyboardArrowRight className="w-6 h-6" />
          </button>
          <button
            ref={nextRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 max-sm:size-8 size-12 rounded-full flex items-center justify-center shadow-lg transition-all"
            aria-label="اسلاید قبلی"
          >
            <MdKeyboardArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
