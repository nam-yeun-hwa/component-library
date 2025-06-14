import { useGetAlarmSetting, useUpdateAlarmSetting } from "@/api/mypage/query";
import { GetAlarmSettingResponse } from "@/api/mypage/types";
import { useModalStore } from "@/store/common/useModalStore";
import { ApiResponse } from "@/types/api";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface AlarmSettingForm {
  system: "0" | "1";
  marketing: "0" | "1";
  payday3: "0" | "1";
  payday: "0" | "1";
}

const useMyPageAlertSetting = (
  initialData: ApiResponse<GetAlarmSettingResponse>
) => {
  const { openModal } = useModalStore();
  const { data } = useGetAlarmSetting(initialData);
  const { control, watch } = useForm<AlarmSettingForm>({
    defaultValues: {
      system: data?.data?.system || "0",
      marketing: data?.data?.marketing || "0",
      payday3: data?.data?.payday3 || "0",
      payday: data?.data?.payday || "0",
    },
  });
  const { mutate } = useUpdateAlarmSetting({
    onSuccess: (data) => {
      const modalTitle = {
        system:
          data.data?.flag === "1"
            ? "시스템 알림 수신 동의 완료"
            : "시스템 알림 수신 거부 완료",
        marketing:
          data.data?.flag === "1"
            ? "마케팅 정보 알림 수신 동의 완료"
            : "마케팅 정보 알림 수신 거부 완료",
        payday3:
          data.data?.flag === "1"
            ? "결제 3일전 알림 수신 동의 완료"
            : "결제 3일전 알림 수신 거부 완료",
        payday:
          data.data?.flag === "1"
            ? "결제 당일 알림 수신 동의 완료"
            : "결제 당일 알림 수신 거부 완료",
      };
      openModal("confirm", {
        title: modalTitle[data?.data?.alarm_type as keyof typeof modalTitle],
        desc: `[${data.data?.created_at}] 수신 정보 설정이 저장되었습니다.`,
        confirmText: "확인",
        onConfirm: () => {},
      });
    },
    onError: () => {},
  });

  const values = watch();
  const prevValues = useRef(values);

  useEffect(() => {
    for (const key in values) {
      const typedKey = key as keyof AlarmSettingForm;
      if (values[typedKey] !== prevValues.current[typedKey]) {
        mutate({ alarm_type: typedKey, flag: values[typedKey] });
      }
    }
    prevValues.current = values;
  }, [values]);

  return {
    control,
  };
};

export default useMyPageAlertSetting;
