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
    if (index >= 0 && index < slides.length) {
      setActiveSlideIndex(index);
    }
  };

  const handleSetIsTransitioning = (transitioning: boolean) => {
    setIsTransitioning(transitioning);
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
  };
};

export default useSlideBanner;
