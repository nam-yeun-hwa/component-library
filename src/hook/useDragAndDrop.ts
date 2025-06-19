import { useState, useRef } from "react";

interface DragAndDropProps {
  slideCount: number;
  currentIndex: number;
  setIndex: (index: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

interface DragAndDropState {
  dragOffset: number;
  isDragging: boolean;
  eventHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const useDragAndDrop = ({
  slideCount,
  currentIndex,
  setIndex,
  isTransitioning,
  setIsTransitioning,
}: DragAndDropProps): DragAndDropState => {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;
    setDragStartX(clientX);
    setIsDragging(true);
    setIsTransitioning(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const offset = clientX - dragStartX;
    requestAnimationFrame(() => setDragOffset(offset));
  };

  const handleDragEnd = () => {
    if (dragStartX === null || !isDragging) return;

    const slideWidth = sliderRef.current?.offsetWidth || 1;
    const threshold = slideWidth * 0.2;
    let newIndex = currentIndex;

    if (dragOffset < -threshold && currentIndex < slideCount - 1) {
      newIndex = currentIndex + 1;
    } else if (dragOffset > threshold && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    setIndex(newIndex);
    setDragStartX(null);
    setDragOffset(0);
    setIsDragging(false);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const eventHandlers = {
    onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
    onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX),
    onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX),
    onTouchEnd: handleDragEnd,
  };

  return {
    dragOffset,
    isDragging,
    eventHandlers,
    sliderRef,
  };
};
