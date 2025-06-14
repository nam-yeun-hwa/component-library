"use client";

import { GetAlarmSettingResponse } from "@/api/mypage/types";
import SectionPage from "@/components/layout/SectionPage";
import useMyPageAlertSetting from "@/components/views/mypage-alert-setting/hooks/useMyPageAlertSetting";
import Switch from "@/components/views/ui/Switch";
import { ApiResponse } from "@/types/api";
import { Controller } from "react-hook-form";

interface MyPageAlertSettingProps {
  initialData: ApiResponse<GetAlarmSettingResponse>;
}

const MyPageAlertSettingComponent = ({
  initialData,
}: MyPageAlertSettingProps) => {
  const { control } = useMyPageAlertSetting(initialData);
  return (
    <SectionPage bgWhite className="space-y-8 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">시스템 알림</h3>
        <Controller
          name="system"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value === "1"}
              width={60}
              height={30}
              onChange={(checked) => field.onChange(checked ? "1" : "0")}
            />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">마케팅 정보 알림</h3>
        <Controller
          name="marketing"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value === "1"}
              width={60}
              height={30}
              onChange={(checked) => field.onChange(checked ? "1" : "0")}
            />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">결제 3일전 알림</h3>
        <Controller
          name="payday3"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value === "1"}
              width={60}
              height={30}
              onChange={(checked) => field.onChange(checked ? "1" : "0")}
            />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">결제 당일 알림</h3>
        <Controller
          name="payday"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value === "1"}
              width={60}
              height={30}
              onChange={(checked) => field.onChange(checked ? "1" : "0")}
            />
          )}
        />
      </div>
    </SectionPage>
  );
};

export default MyPageAlertSettingComponent;
