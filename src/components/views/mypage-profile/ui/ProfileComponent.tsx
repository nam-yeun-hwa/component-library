"use client";

import { GetMeResponse } from "@/api/mypage/types";
import Button from "@/components/common/ui/Button";
import SectionPage from "@/components/layout/SectionPage";
import useProfile from "@/components/views/mypage-profile/hooks/useProfile";
import { ApiResponse } from "@/types/api";
import { formatPhoneNumber } from "@/utils/format";
import React from "react";

interface ProfileComponentProps {
  initialData: ApiResponse<GetMeResponse>; // Replace 'any' with the actual type if available
}

const ProfileComponent = ({ initialData }: ProfileComponentProps) => {
  const { handleGoToChangePassword, profileData } = useProfile(initialData);

  return (
    <SectionPage className="relative pb-0">
      <div className="bg-white rounded-box-md shadow-sm py-[20px] px-[12px] mt-[20px]">
        {/* 프로필 추후 추가 시 사용 */}
        {/* <ProfileAvatar /> */}
        <div className="space-y-4">
          <div className="flex items-center">
            <h2 className="w-36 font-semibold text-body-lg">이름</h2>
            <p className="text-body-lg">{profileData?.name}</p>
          </div>
          <div className="flex items-center">
            <h2 className="w-36 font-semibold text-body-lg">휴대폰 번호</h2>
            <p className="text-body-lg">
              {formatPhoneNumber(profileData?.phone_number || "")}
            </p>
          </div>
          <div className="flex items-center">
            <h2 className="w-36 font-semibold text-body-lg">이메일</h2>
            <p className="text-body-lg">{profileData?.email}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[20px] left-0 w-full px-6">
        <Button variant="outlinePrimary" onClick={handleGoToChangePassword}>
          비밀번호 변경하기
        </Button>
      </div>
    </SectionPage>
  );
};

export default ProfileComponent;
