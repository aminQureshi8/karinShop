"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperSlideBrand from "@/components/module/Home/SwiperSlideBrand/SwiperSlideBrand";

export default function BrandSwiper() {
  return (
    <div className="w-full  overflow-hidden mt-5 mb-5">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 14 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className="mySwiper !h-[210px]"
      >
        <SwiperSlide>
          <SwiperSlideBrand />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
