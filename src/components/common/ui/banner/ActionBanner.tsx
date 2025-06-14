import classNames from "classnames";
import Image from "next/image";
import { ReactNode } from "react";

// 배너 타입에 따라 반환할 ReactNode를 정의
const bannerContents: Record<"A" | "B", ReactNode> = {
  A: (
    <div className="flex flex-row items-center">
      <div className="bg-[#f2f8ff] rounded-[50px] mr-[5px] inline-block">
        <span className="text-[0.6875rem]  text-main-blue py-[5px] px-[5px]  whitespace-nowrap  font-semibold inline-block">
          1년치 월세 OK!
        </span>
      </div>
      <p className="text-banner-dark text-[0.75rem] font-normal">연세 결제, 월세보다 더 경제적인 선택!</p>
    </div>
  ),
  B: <div className="flex flex-col"></div>,
};

interface ActionBannerProps {
  bannerType: "A" | "B";
  classname?: string; // 클래스 이름 충돌 방지를 위해 className 사용
}

const ActionBanner = ({ bannerType, classname }: ActionBannerProps) => {
  return (
    <div
      className={classNames(
        "w-full flex items-center !justify-between bg-white shadow-sm rounded-lg py-2 px-2 cursor-pointer",
        classname
      )}
    >
      {bannerContents[bannerType]}
      <div className="flex items-center">
        <Image alt="오른쪽 화살표" src="/images/right-arrow.svg" width={16} height={16} />
      </div>
    </div>
  );
};

export default ActionBanner;
