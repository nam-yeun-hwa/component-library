// components/BannerSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "assets/css/banner-swiper.css";
import Image from "next/image";

const banners = [
  "/images/banner_example04.jpg",
  "/images/banner_example01.jpg",
  "/images/banner_example03.jpg",
  "/images/banner_example02.jpg",
  "/images/banner_example05.jpg",
];

const HomeBannerSlider = () => {
  // TODO: 배너 이미지 클릭 시, 공지사항 연결 개발 필요
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        centeredSlides
        slidesPerView={1}
        spaceBetween={12}
        autoplay={{ delay: 5000 }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        className="!overflow-visible"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-[calc(100% - 32px)] aspect-[919/310]">
              <Image
                src={banner}
                alt="카드 이미지"
                fill
                className="object-cover rounded-[8px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-pagination swiper-pagination !relative !mt-5" />
    </div>
  );
};

export default HomeBannerSlider;
