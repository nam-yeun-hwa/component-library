"use client";

import SectionPage from "@/components/layout/SectionPage";
import HomeBannerSlider from "./HomeBannerSlider";
import HomePayDetail from "./HomePayDetail";
import { ApiResponse } from "@/types/api";
import { GetRecentPayDetailResponse } from "@/api/home/types";
import HomeBottomInfo from "./HomeBottomInfo";
import HomePayBanner from "./HomePayBanner";
import HomeExploreService from "./HomeExploreService";
import Image from "next/image";
import HomePayButton from "./HomePayButton";

interface HomeComponentProps {
  initialData?: ApiResponse<GetRecentPayDetailResponse>; // Replace with the actual type if available
}

const HomeComponent = ({ initialData }: HomeComponentProps) => {
  return (
    <SectionPage className="relative">
      {/* 상단 슬라이드 배너 */}
      <HomeBannerSlider />
      {/* 서비스 알아보기 */}
      <HomeExploreService />
      {/* 연세살이 보증금 월세선납 버튼 배너 */}
      <HomePayBanner />
      {/* 거래내역 */}
      <div className="mt-5">
        <h3 className="font-bold mb-[10px]">거래내역</h3>
        {initialData && initialData.data && initialData.data.list.length > 0 ? (
          <HomePayDetail initialData={initialData} />
        ) : (
          <div className="flex items-center justify-center p-[30px] rounded-[10px] flex-col bg-white shadow-sm">
            <h4 className="font-bold text-[18px] mb-2 ">
              거래한 내역이 없습니다.
            </h4>
            <p className="text-gray-dark-300 text-caption-default mb-4">
              렌탈페이로 간편하게 월세 관리를 이용해보세요.
            </p>
            <Image
              src="/images/empty.png"
              alt="empty"
              width={100}
              height={79}
            />
          </div>
        )}
      </div>
      {/* 하단 정보 */}
      <HomeBottomInfo />
      {/* 고정 결제 버튼 */}
      <HomePayButton />
    </SectionPage>
  );
};

export default HomeComponent;
