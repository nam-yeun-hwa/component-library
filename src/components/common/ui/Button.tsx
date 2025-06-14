import React, { MouseEvent } from "react";
import Image from "next/image";

/**
 * @interface ButtonProps
 * 버튼 컴포넌트의 속성(props)을 정의합니다.
 * @property {"button" | "submit" | "reset"} [type="button"] - 버튼의 HTML 타입 속성
 * @property {"primary" | "secondary" | "danger" | "outline"} [variant="primary"] - 버튼의 시각적 스타일
 * @property {"small" | "medium" | "large"} [size="medium"] - 버튼의 크기
 * @property {(e: MouseEvent<HTMLButtonElement>) => void} [onClick] - 클릭 이벤트 핸들러
 * @property {boolean} [disabled=false] - 버튼 비활성화 여부
 * @property {React.ReactNode} children - 버튼 내부에 표시할 내용
 * @property {string} [className] - 추가적인 CSS 스타일을 위한 클래스 이름
 * @property {[key: string]: any} [...rest] - 추가적인 HTML 버튼 속성
 */
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outlineGray" | "kakao" | "outlinePrimary" | "outlineDanger";
  size?: "small" | "medium" | "large";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  icon?: string; // 아이콘 이미지 경로 (선택사항)
  iconAlt?: string; // 아이콘 이미지 alt 텍스트
  iconSize?: number; // 아이콘 크기
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * 재사용 가능한 버튼 컴포넌트로, 다양한 스타일, 크기, 상태를 지원합니다.
 * @param {ButtonProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 스타일링된 버튼 요소
 */
const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  children,
  className = "",
  icon,
  iconAlt = "icon",
  iconSize = 40,
  ...rest
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // Tailwind CSS 동적 클래스 생성
  const sizeStyles = {
    small: "px-2  text-[13px] h-[30px]",
    medium: "px-4  text-[16px] h-[48px] rounded-md",
    large: "px-7.5  text-lg h-[52px]",
  };

  const variantStyles = {
    primary: "bg-main-blue text-white ",
    secondary: "bg-main-gray text-white",
    danger: "bg-[#f1f1f1] text-input-dark hover:bg-red-600 hover:text-white",
    outlinePrimary:
      "bg-transparent text-main-blue border border-main-blue hover:bg-main-blue hover:text-white hover:border-main-blue",
    outlineGray:
      "bg-transparent text-outline-gray border border-outline-gray hover:bg-main-blue hover:text-white hover:border-main-blue ",
    kakao: "bg-kakao-yellow text-primary flex items-center justify-center",
    outlineDanger: "bg-transparent text-red-danger border border-red-danger hover:bg-red-600",
  };

  const baseStyles = "w-full font-medium transition-all duration-200 ease-in-out whitespace-nowrap rounded-md";
  const disabledStyles = disabled ? "!bg-button-disabled !text-text-disabled cursor-not-allowed" : "cursor-pointer";

  const buttonStyles = [baseStyles, sizeStyles[size], variantStyles[variant], disabledStyles, className].join(" ");

  return (
    <button type={type} onClick={handleClick} disabled={disabled} className={buttonStyles} {...rest}>
      {children}
      {/* 아이콘이 있는 경우 (주로 카카오 버튼) */}
      {icon && <Image src={icon} alt={iconAlt} width={iconSize} height={iconSize} className="absolute left-[35px] " />}
    </button>
  );
};

export default Button;
