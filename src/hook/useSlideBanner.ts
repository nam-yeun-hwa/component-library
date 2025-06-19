import { Product } from "@/data/products";
import { useState } from "react";

interface SlideBannerState {
  slides: Product[];
  activeState: boolean;
  showNavigation: boolean;
  showPagination: boolean;
  activeSlideIndex: number;
  isTransitioning: boolean;
  updateSlides: (slideData: Product[]) => void;
  handleSetActiveState: (active: boolean) => void;
  handleSetShowNavigation: (show: boolean) => void;
  handleSetShowPagination: (show: boolean) => void;
  handleSetActiveSlideIndex: (index: number) => void;
  handleSetIsTransitioning: (isTransitioning: boolean) => void;
  handleGoToSlide: (index: number) => void;
}

const useSlideBanner = (initialSlides: Product[] = []): SlideBannerState => {
  const [slides, setSlides] = useState<Product[]>(initialSlides);
  const [activeState, setActiveState] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(activeSlideIndex);
  // }, [activeSlideIndex]);

  const updateSlides = (newSlides: Product[]) => {
    setSlides(newSlides);
  };

  const handleSetActiveState = (active: boolean) => {
    setActiveState(active);
  };

  const handleSetShowNavigation = (show: boolean) => {
    setShowNavigation(show);
  };

  const handleSetShowPagination = (show: boolean) => {
    setShowPagination(show);
  };

  const handleSetActiveSlideIndex = (index: number) => {
    if (slides.length === 0) return;
    let newIndex = index;
    if (index < 0) {
      newIndex = slides.length - 1; // 첫 슬라이드에서 왼쪽 드래그 -> 마지막 슬라이드
    } else if (index >= slides.length) {
      newIndex = 0; // 마지막 슬라이드에서 오른쪽 드래그 -> 첫 슬라이드
    }
    setActiveSlideIndex(newIndex);
  };

  const handleSetIsTransitioning = (transitioning: boolean) => {
    setIsTransitioning(transitioning);
  };

  const handleGoToSlide = (index: number): void => {
    if (isTransitioning || index === activeSlideIndex) return;
    handleSetIsTransitioning(true);
    handleSetActiveSlideIndex(index);
    setTimeout(() => handleSetIsTransitioning(false), 300);
  };

  return {
    slides,
    activeState,
    showNavigation,
    showPagination,
    activeSlideIndex,
    isTransitioning,
    updateSlides,
    handleSetActiveState,
    handleSetShowNavigation,
    handleSetShowPagination,
    handleSetActiveSlideIndex,
    handleSetIsTransitioning,
    handleGoToSlide,
  };
};

export default useSlideBanner;
