import classNames from "classnames";
import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface FormInputProps {
  register: UseFormRegisterReturn;
  // bgGray?: boolean;
  inputType?: "nomal" | "gray" | "hidden";
  name: string;
  errors: FieldErrors;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  pattern?: string;
  noOutline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
  isReadOnly?: boolean;
}

/**
 * 폼 입력 필드 컴포넌트입니다.
 * React Hook Form과 함께 사용되며, 에러 메시지와 스타일을 자동으로 처리합니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트 props
 * @param {UseFormRegisterReturn} props.register - react-hook-form의 register 객체
 * @param {string} props.name - 해당 input의 name (errors와 연결됨)
 * @param {FieldErrors} props.errors - react-hook-form에서 전달받은 errors 객체
 * @param {string} [props.placeholder] - placeholder 텍스트
 * @param {string} [props.type="text"] - input type (`text`, `email`, `password` 등)
 * @param {string} [props.value] - input의 값 (제어 컴포넌트로 사용할 경우)
 * @param {boolean} [props.disabled] - input 비활성화 여부
 * @param {"text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal"} [props.inputMode="text"] - 모바일 키패드 및 입력 형식 힌트
 * @param {string} [props.pattern] - 입력 패턴 (정규식)
 * @param {boolean} [props.noOutline] - 포커스 시 아웃라인 제거 여부 (현재 미사용)
 * @param {string} [props.className] - 추가 클래스
 * @param {React.CSSProperties} [props.style] - 인라인 스타일
 * @param {string} [props.autoComplete] - 자동완성 속성
 *
 * @returns {JSX.Element} 사용자의 입력을 받을 수 있는 styled input 필드
 */

export const FormInput: React.FC<FormInputProps> = ({
  register,
  inputType = "gray",
  name,
  errors,
  placeholder = "",
  type = "text",
  disabled,
  inputMode = "text",
  pattern,
  style,
  isReadOnly = false,
  className = "",
}) => {
  // const hasError = Boolean(errors[name]);

  const baseStyle =
    "w-full h-12 px-[15px] rounded-md text-sm border border-outline-gray text-left";
  const disabledStyle = "disabled:opacity-50";
  const focusStyle = "focus:outline";

  return (
    <>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
        inputMode={inputMode}
        readOnly={isReadOnly}
        //  onChange={register.onChange}
        className={classNames(
          baseStyle,
          focusStyle,
          disabledStyle,
          { "bg-input-gray !border-input-gray": inputType === "gray" },
          { "bg-transparent focus:outline-none": isReadOnly },
          { "border-status-error": errors[name] },
          className
        )}
        style={style}
      />
      {errors[name]?.message && (
        <div className="text-status-error text-caption-md mt-1 px-md">
          {errors[name].message as string}
        </div>
      )}
    </>
  );
};
