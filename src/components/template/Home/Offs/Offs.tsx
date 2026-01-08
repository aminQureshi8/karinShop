"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const products = [
  {
    id: 1,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/image/lap.png",
  },
  {
    id: 2,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 3,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 4,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 5,
    title:
      "لپ تاپ ایسوس Vivojjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjbook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 5,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 5,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 5,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
  {
    id: 5,
    title: "لپ تاپ ایسوس Vivobook 15",
    price: 13000000,
    img: "/laptop.png",
  },
];

export default function Offs() {
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
          <div className="h-full text-white flex flex-col justify-center gap-5 p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold leading-9">
                پیشنهاد
                <br />
                شگفت‌
                <br />
                انگیز
              </h2>

              <div className="flex gap-2 mt-4 text-sm justify-center">
                {["17", "36", "52"].map((t, i) => (
                  <span
                    key={i}
                    className="bg-white text-blue-600 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button className="text-sm opacity-80 hover:opacity-100 flex  items-center justify-center ">
              مشاهده همه
              <MdKeyboardArrowLeft size={19} />
            </button>
          </div>
        </SwiperSlide>

        {products.map((product) => (
          <SwiperSlide key={product.id} className="!w-64 !h-full">
            <div className="bg-white  dark:bg-slate-800 dark:text-white rounded-xl p-3 h-full flex flex-col justify-between">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-42 object-contain"
              />

              <p className="text-sm mt-3 line-clamp-2">{product.title}</p>

              <div className="mt-3 flex justify-between items-center border-t-2 pt-2 border-gray-200">
                <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">
                  ۷٪
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
