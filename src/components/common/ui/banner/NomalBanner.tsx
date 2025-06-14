import { ReactNode } from "react";
import classNames from "classnames";
import RoundSection from "@/components/layout/RoundSection";

interface NormalBannerProps {
  bannerType: "A" | "B";
  classname?: string; // 클래스 이름 충돌 방지를 위해 className 사용
}

const beforeStyle =
  "before:w-[18px] before:h-[18px] before:bg-[url('/images/thumb.svg')] before:bg-no-repeat before:bg-center before:content-[''] before:block before:bg-no-repeat before:bg-center before:content-[''] before:mr-[5px]";
const baseStyle =
  "flex flex-row w-1/2 relative text-banner-gray text-banner-sm font-semibold";

const bannerStyle = [beforeStyle, baseStyle].join(" ");

const bannerContents: Record<"A" | "B", ReactNode> = {
  A: (
    <div className="w-full flex flex-wrap gap-y-[10px]">
      <span
        className={classNames(
          bannerStyle,
          `before:bg-[url('/images/thumb.svg')]`
        )}
      >
        최대 7개월 무이자 할부
      </span>
      <span
        className={classNames(
          bannerStyle,
          `before:bg-[url('/images/thumb2.svg')]`
        )}
      >
        업계 최저 수수료
      </span>
      <span
        className={classNames(
          bannerStyle,
          `before:bg-[url('/images/thumb2.svg')]`
        )}
      >
        영업일 기준 익일 송금
      </span>
      <span
        className={classNames(
          bannerStyle,
          `before:bg-[url('/images/thumb.svg')]`
        )}
      >
        공인중개사 공식 가맹점
      </span>
    </div>
  ),
  B: <div></div>,
};

const NormalBanner = ({ bannerType, classname }: NormalBannerProps) => {
  return (
    <RoundSection classname={classname}>
      {bannerContents[bannerType]}
    </RoundSection>
  );
};

export default NormalBanner;
