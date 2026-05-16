"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HotProduct from "@/components/module/Home/HotProduct/HotProduct";

export default function HotSwiperContainer({ products }) {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 14 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        {products.map((p) => (
          <SwiperSlide>
            <HotProduct {...p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
