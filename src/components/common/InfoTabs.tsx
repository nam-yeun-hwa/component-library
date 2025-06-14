import { useRef, useEffect, useState } from "react";
import { infoTabs } from "@/data/infoTabs";
import CustomSwiper from "./Swiper";

export interface InfoTabsProps {
  value: string;
  onChange: (val: string) => void;
}

const InfoTabs: React.FC<InfoTabsProps> = ({ value, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  // 각 탭별 슬라이드 인덱스 저장
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>(
    infoTabs.reduce((acc, tab) => ({ ...acc, [tab.value]: 0 }), {})
  );

  useEffect(() => {
    if (containerRef.current && activeTabRef.current) {
      const container = containerRef.current;
      const activeTab = activeTabRef.current;

      // 컨테이너를 기준으로 활성 탭의 위치와 너비를 계산
      const { offsetLeft, offsetWidth } = activeTab;
      const indicator = container.querySelector(".tab-indicator") as HTMLDivElement;

      // 인디케이터의 위치와 너비를 업데이트
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [value]);

  // 현재 활성화된 탭의 이미지들을 찾기
  const activeTab = infoTabs.find((option) => option.value === value);
  const images = activeTab ? activeTab.images : [];

  // 현재 활성 탭의 슬라이드 인덱스 업데이트
  const handleSlideChange = (index: number) => {
    setSlideIndices((prev) => ({ ...prev, [value]: index }));
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className=" bg-white fixed top-0 mt-[60px] w-full z-50 max-w-[600px] flex justify-between border-b border-gray-300"
      >
        {infoTabs.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              ref={isSelected ? activeTabRef : null}
              onClick={() => onChange(option.value)}
              className={`flex-1 h-10 text-sm font-medium duration-300 relative text-center text-gray-800
                ${isSelected ? "!text-[#0099FF]" : ""} hover:bg-transparent hover:text-[#0099FF]`}
            >
              {option.label}
            </button>
          );
        })}
        {/* 슬라이딩 인디케이터 */}
        <div
          className="tab-indicator absolute h-[3px] bottom-0 rounded-xl bg-[#0099FF] shadow transition-all duration-300 ease-in-out"
          style={{ willChange: "transform, width" }}
        ></div>
      </div>
      <CustomSwiper
        images={images}
        activeTab={value}
        initialSlide={slideIndices[value]}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
};

export default InfoTabs;
