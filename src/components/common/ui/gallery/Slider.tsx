import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useSwiperStore from "@/store/common/useSwiperStore";

// Swiper 컴포넌트의 Props 타입 정의
interface SwiperProps {
  className?: string;
}

const Slider: React.FC<SwiperProps> = ({ className = "" }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const { setActiveSlideIndex, slides, activeSlideIndex, setCloseState } = useSwiperStore();

  useEffect(() => {
    console.log(activeSlideIndex);
  }, [activeSlideIndex]);

  const nextSlide = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (activeSlideIndex < slides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (activeSlideIndex >= 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === activeSlideIndex) return;
    setIsTransitioning(true);
    setActiveSlideIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  if (slides.length === 0) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 딤 처리 오버레이 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCloseState(false)}
        role="button"
        aria-label="Close modal"
      />

      {/* 슬라이더 컨테이너 */}
      <div className={`relative w-full max-w-4xl h-96 rounded-lg shadow-2xl bg-white overflow-hidden ${className}`}>
        {/* 닫기 버튼 */}
        <button
          onClick={() => setCloseState(false)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200"
          aria-label="Close slider"
        >
          <X size={24} />
        </button>

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
                <img
                  src={slide.previewPath}
                  alt={slide.file.name}
                  className="mt-4 max-h-40 mx-auto object-cover rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ============================
				======== 네비게이션 버튼 영역 =======
				============================ */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning || activeSlideIndex === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning || slides.length - 1 === activeSlideIndex}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* 페이지네이션 */}
        {slides.length > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeSlideIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
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
