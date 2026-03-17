"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SwiperBanner() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="">
      <Swiper
        className="mySwiper rounded-4xl"
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper: any) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        spaceBetween={25}
        loop={true}
      >
        <SwiperSlide>
          <Image
            alt="Banner"
            src="/image/bg.jpg"
            className="rounded-4xl"
            width={1515}
            height={900}
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 1515px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Banner"
            src="/image/bg1.gif"
            className="rounded-4xl"
            width={1515}
            height={900}
            sizes="(max-width: 768px) 100vw, 1515px"
          />
        </SwiperSlide>

        <div>
          <button
            ref={nextRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 max-sm:size-8 size-12 rounded-full flex items-center justify-center shadow-lg transition-all"
            aria-label="اسلاید بعدی"
          >
            <MdKeyboardArrowRight className="w-6 h-6" />
          </button>
          <button
            ref={prevRef}
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

export default SwiperBanner;
