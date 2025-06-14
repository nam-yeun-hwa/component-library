import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface EmailDomainSelectProps {
  noOutline?: boolean;
}

export default function EmailDomainSelect({
  noOutline = false,
}: EmailDomainSelectProps) {
  const { register, setValue, watch, setError, clearErrors } = useFormContext();
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 직접 입력 모드로 전환될 때 input에 포커스
  useEffect(() => {
    if (isCustomDomain && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isCustomDomain]);

  const validateDomain = (value: string) => {
    const allowedDomains = ["naver.com", "gmail.com", "daum.net"];
    if (!value || value === "") {
      return "이메일을 입력해주세요.";
    }
    if (
      !allowedDomains.includes(value) &&
      !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      return "올바른 이메일 형식을 입력해주세요.";
    }
    return true;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === "custom") {
      setIsCustomDomain(true);
      setValue("emailDomain", "");
      clearErrors("emailDomain");
    } else {
      setIsCustomDomain(false);
      setValue("emailDomain", selected);
      const validationResult = validateDomain(selected);
      if (validationResult !== true) {
        setError("emailDomain", { message: validationResult });
      } else {
        clearErrors("emailDomain");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("emailDomain", value);

    const validationResult = validateDomain(value);
    if (validationResult !== true) {
      setError("emailDomain", { message: validationResult });
    } else {
      clearErrors("emailDomain");
    }
  };

  return (
    <div className="flex-1 relative">
      {isCustomDomain ? (
        <input
          ref={inputRef}
          onChange={handleInputChange}
          value={watch("emailDomain")}
          className={`w-full rounded-[10px] px-3 py-2 h-12 text-sm placeholder-[#8E8E8E] text-input-dark ${
            noOutline
              ? "bg-[#f9f9f9] border-none focus:outline-none"
              : "border border-gray-300 focus:outline-none focus:ring-0"
          }`}
          placeholder="이메일 입력"
          type="text"
        />
      ) : (
        <select
          {...register("emailDomain", {
            required: "이메일을 선택하거나 입력해주세요.",
            validate: validateDomain,
            onChange: handleSelectChange,
          })}
          className={`w-full rounded-[10px] px-3 py-2 h-12 text-sm placeholder-[#8E8E8E] text-input-dark ${
            noOutline
              ? "bg-[#f9f9f9] border-none focus:outline-none"
              : "border border-gray-300 focus:outline-none focus:ring-0"
          }`}
          defaultValue=""
        >
          <option value="">선택</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="daum.net">daum.net</option>
          <option value="custom">직접입력</option>
        </select>
      )}
    </div>
  );
}
