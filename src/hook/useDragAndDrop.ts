import { useState, useRef } from "react";

/**
 * DragAndDropProps
 * 드래그 앤 드롭 커스텀 훅에 전달되는 props 타입입니다.
 */
interface DragAndDropProps {
  slideCount: number;
  currentIndex: number;
  setIndex: (index: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

/**
 * DragAndDropState
 * 드래그 앤 드롭 관련 상태와 이벤트 핸들러를 담는 커스텀 훅의 반환 타입입니다.
 */
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
  sliderRef: React.RefObject<HTMLDivElement | null>;
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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  /**
   * @function handleDragStart
   * @param {number} clientX - 마우스 또는 터치의 X 좌표입니다.
   * @description 사용자가 마우스나 터치로 드래그를 시작할 때 호출됩니다.
   */
  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;
    setDragStartX(clientX);
    setIsDragging(true);
    setIsTransitioning(true);
  };

  /**
   * @function handleDragMove
   * @param {number} clientX - 현재 마우스 또는 터치의 X 좌표입니다.
   * @description 사용자가 드래그하는 동안 호출되어 현재 위치에서의 이동 거리를 계산합니다.
   */
  const handleDragMove = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const offset = clientX - dragStartX;

    requestAnimationFrame(() => setDragOffset(offset));
  };

  /**
   * @function handleDragEnd
   * @returns {void} - 드래그가 시작되지 않았거나 시작 위치가 없다면 아무 작업도 하지 않습니다.
   * @description 드래그가 종료될 때 슬라이드를 이동할지 여부를 판단합니다.
   */
  const handleDragEnd = () => {
    if (dragStartX === null || !isDragging) return;

    const slideWidth = sliderRef.current?.offsetWidth || 1;
    const threshold = slideWidth * 0.2;
    //이 값은 사용자가 드래그해야 하는 최소 픽셀 거리를 나타냅니다.
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
