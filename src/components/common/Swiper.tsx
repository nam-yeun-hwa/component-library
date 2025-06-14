import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface SwiperProps {
  images: string[];
  activeTab: string;
  initialSlide: number;
  onSlideChange: (index: number) => void;
}

const CustomSwiper: React.FC<SwiperProps> = ({
  images,
  activeTab,
  initialSlide,
  onSlideChange,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(initialSlide, 0); // Set to saved slide index
    }
  }, [activeTab, initialSlide]);

  return (
    <div className="w-full flex flex-col items-center mt-[42px]">
      <div className="relative w-full max-w-3xl mx-auto">
        <Swiper
          style={
            {
              "--swiper-pagination-color": "#0099FF",
            } as React.CSSProperties & Record<string, unknown>
          }
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          className="w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.slideTo(initialSlide, 0); // Set initial slide on mount
          }}
          onSlideChange={(swiper) => {
            onSlideChange(swiper.activeIndex);
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${activeTab}-${index}`}>
              <div className="">
                <div className="bg-gray-200 overflow-hidden">
                  <Image
                    src={image}
                    alt={`Guidance image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 네비게이션 화살표 */}
        <button
          className="swiper-prev absolute left-[6px] top-1/2 -translate-y-1/2 z-20 bg-gray-200 rounded-full p-1 hover:bg-gray-100"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="swiper-next absolute right-[6px] top-1/2 -translate-y-1/2 z-20 bg-gray-200 rounded-full p-1 hover:bg-gray-100"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default CustomSwiper;
