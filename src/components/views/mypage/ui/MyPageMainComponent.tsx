"use client";

import { GetMeResponse } from "@/api/mypage/types";
import Button from "@/components/common/ui/Button";
import SectionPage from "@/components/layout/SectionPage";
import { useMyPage } from "@/components/views/mypage/hooks/useMyPage";
import MypageListItem from "@/components/views/mypage/ui/MyPageListItem";
import { ApiResponse } from "@/types/api";
import { formatPhoneNumber } from "@/utils/format";
import Image from "next/image";
import React from "react";

interface MyPageMainComponentProps {
  initialData?: ApiResponse<GetMeResponse>;
}

export default function MyPageMainComponent({
  initialData,
}: MyPageMainComponentProps) {
  const { mypageData, handleProfileClick, profileData, handleLogout } =
    useMyPage(initialData);

  return (
    <SectionPage bgWhite>
      <div
        className="flex justify-between items-center py-[10px] cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="flex items-center gap-[8px]">
          {/* 추후 프로필 이미지 업데이트 추가 시 사용 */}
          {/* <Avatar /> */}
          <div>
            <p className="font-semibold text-section-h2 text-main-blue">
              {profileData?.name}
              <span className="font-normal text-base ml-2 text-black">님</span>
            </p>
            <p className="text-[14px] text-[#666666] font-semibold">
              {formatPhoneNumber(profileData?.phone_number ?? "")}
            </p>
          </div>
        </div>
        <Image
          src="/images/right-arrow.svg"
          alt="right-arrow"
          width={20}
          height={20}
        />
      </div>
      <div className="w-full h-[2px] bg-[#f7f7f7]" />
      {Object.keys(mypageData).map((key) => {
        const item = mypageData[key as keyof typeof mypageData];
        return (
          <MypageListItem key={key} title={item.title} onClick={item.onClick} />
        );
      })}
      <div className="py-[15px]">
        <Button variant="outlinePrimary" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </SectionPage>
  );
}
