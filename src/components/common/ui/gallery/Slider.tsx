"use client";
import useSlideBanner from "@/hook/useSlideBanner";
import Image from "next/image";
import { Product } from "@/data/products";
// import { ChevronLeft, ChevronRight} from "lucide-react";

// Swiper 컴포넌트의 Props 타입 정의
interface SwiperProps {
  products: Product[];
  className?: string;
}

const Slider: React.FC<SwiperProps> = ({ className = "", products }) => {
  const { handleSetActiveSlideIndex, slides, activeSlideIndex, isTransitioning, handleSetIsTransitioning } =
    useSlideBanner(products);

  // const nextSlide = (): void => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   if (activeSlideIndex < slides.length - 1) {
  //     handleSetActiveSlideIndex(activeSlideIndex + 1);
  //   }
  //   setTimeout(() => setIsTransitioning(false), 300);
  // };

  // const prevSlide = (): void => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   if (activeSlideIndex >= 0) {
  //     handleSetActiveSlideIndex(activeSlideIndex - 1);
  //   }
  //   setTimeout(() => setIsTransitioning(false), 300);
  // };

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === activeSlideIndex) return;
    handleSetIsTransitioning(true);
    handleSetActiveSlideIndex(index);
    setTimeout(() => handleSetIsTransitioning(false), 300);
  };

  if (slides.length === 0) {
    return <></>;
  }

  return (
    <div className="">
      {/* 슬라이더 컨테이너 */}
      <div className={`relative w-full max-w-4xl h-96 rounded-lg shadow-2xl bg-white overflow-hidden ${className}`}>
        {/* 슬라이드 컨테이너 */}
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full flex items-center justify-center relative">
              {/* 배경 색상 */}
              {/* 슬라이드 콘텐츠 */}
              <div className="relative z-10 text-center p-8">
                <Image
                  src={slide.imageUrl}
                  alt={slide.description}
                  className="mr-2"
                  width={25} // SVG 크기에 맞는 값 설정 (필수)
                  height={25} // SVG 크기에 맞는 값 설정 (필수)
                />
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {slides.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeSlideIndex ? "bg-red-400 scale-110" : "bg-gray-400 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
