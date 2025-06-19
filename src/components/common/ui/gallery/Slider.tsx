"use client";
import useSlideBanner from "@/hook/useSlideBanner";
import Image from "next/image";
import { Product } from "@/data/products";
import { useDragAndDrop } from "@/hook/useDragAndDrop";

interface SwiperProps {
  products: Product[];
  className?: string;
}

const Slider: React.FC<SwiperProps> = ({ className = "", products }) => {
  const {
    slides,
    activeSlideIndex,
    isTransitioning,
    showPagination,
    handleSetActiveSlideIndex,
    handleSetIsTransitioning,
  } = useSlideBanner(products);

  const { dragOffset, eventHandlers, sliderRef } = useDragAndDrop({
    slideCount: slides.length,
    currentIndex: activeSlideIndex,
    setIndex: handleSetActiveSlideIndex,
    isTransitioning,
    setIsTransitioning: handleSetIsTransitioning,
  });

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === activeSlideIndex) return;
    handleSetIsTransitioning(true);
    handleSetActiveSlideIndex(index);
    setTimeout(() => handleSetIsTransitioning(false), 300);
  };

  if (slides.length === 0) {
    return <></>;
  }

  const translateX = `calc(-${activeSlideIndex * 100}% + ${dragOffset}px)`;

  return (
    <div className="">
      <div
        className={`relative w-full max-w-4xl h-96 rounded-lg shadow-2xl bg-white overflow-hidden ${className}`}
        ref={sliderRef}
        {...eventHandlers}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(${translateX})` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full flex items-center justify-center relative">
              <div className="relative w-full h-full z-10 text-center p-8">
                <Image
                  src={slide.imageUrl}
                  alt={slide.description}
                  className="w-full h-full object-cover bg-pink-300"
                  width={800}
                  height={400}
                />
              </div>
            </div>
          ))}
        </div>

        {showPagination && slides.length > 0 && (
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
