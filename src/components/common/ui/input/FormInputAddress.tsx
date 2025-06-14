import { ProfileFormData } from "@/app/(layoutCase)/rent-payment/add-base/data";
import classNames from "classnames";
import React, { useEffect } from "react";
import {
  FieldErrors,
  UseFormRegisterReturn,
  UseFormReset,
} from "react-hook-form";
import { useUserContractStore } from "@/store/rent-payment/useUserInfo";
import { useKakaoAddrStore } from "@/store/common/useKakaoAddrStore";

export interface FormInputProps {
  register: UseFormRegisterReturn;
  name: string;
  errors: FieldErrors;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  pattern?: string;
  noOutline?: boolean;
  className?: string; // 추가
  style?: React.CSSProperties;
  reset: UseFormReset<ProfileFormData>;
}
export const FormInputAddress: React.FC<FormInputProps> = ({
  register,
  name,
  errors,
  placeholder = "",
  type = "text",
  // value = "",
  disabled,
  pattern,
  style,
  reset,
}) => {
  const { baseAddress } = useUserContractStore();
  const { setModalViewToggle } = useKakaoAddrStore();
  useEffect(() => {
    reset({
      address: baseAddress,
    });
  }, [baseAddress, reset]);

  return (
    <>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
        className={classNames(
          `w-full h-12 px-[15px] rounded-md text-sm text-input-dark bg-input-gray border border-input-gray focus:outline`,
          { "border focus:outline ": errors[name] }
        )}
        style={style}
        onClick={() => {
          setModalViewToggle(true);
        }}
        inputMode={"text"}
      />

      {errors[name]?.message && (
        <div className="text-red-500 text-xs mb-[15px] px-[15px]">
          {errors[name].message as string}
        </div>
      )}
    </>
  );
};
