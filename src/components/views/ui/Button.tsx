import React from "react";
import Image from "next/image";

export interface CustomButtonProps {
  type?: "button" | "submit" | "reset"; // 버튼 타입
  variant?: "primary" | "kakao"; // 버튼 변형 (기본, 카카오)
  text: string; // 버튼 텍스트
  onClick?: () => void; // 클릭 이벤트 핸들러
  disabled?: boolean; // 비활성화 여부
  className?: string; // 추가 CSS 클래스
  icon?: string; // 아이콘 이미지 경로 (선택사항)
  iconAlt?: string; // 아이콘 이미지 alt 텍스트
  iconSize?: number; // 아이콘 크기
  touchEffect?: boolean; // 터치/호버 효과 활성화 여부
  textColor?: string; // ✅ 추가된 부분
}

/**
 * CustomButton 컴포넌트
 * @description 재사용 가능한 커스텀 버튼 컴포넌트로, 기본 버튼과 카카오 로그인 버튼 스타일을 지원합니다.
 * TouchableOpacity와 같은 터치 효과를 포함합니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.type='button'] - 버튼 타입 (button, submit, reset)
 * @param {string} [props.variant='primary'] - 버튼 변형 (primary, kakao)
 * @param {string} props.text - 버튼에 표시될 텍스트
 * @param {Function} [props.onClick] - 버튼 클릭 시 실행될 함수
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 * @param {string} [props.className=''] - 추가 CSS 클래스
 * @param {string} [props.icon] - 아이콘 이미지 경로
 * @param {string} [props.iconAlt='icon'] - 아이콘 이미지 alt 텍스트
 * @param {number} [props.iconSize=40] - 아이콘 크기
 * @param {boolean} [props.touchEffect=true] - 터치/호버 효과 활성화 여부
 * @returns {JSX.Element} 커스텀 버튼 컴포넌트
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  variant = "primary",
  text,
  onClick,
  disabled = false,
  className = "",
  icon,
  iconAlt = "icon",
  iconSize = 40,
  touchEffect = true,
  textColor,
}) => {
  const baseStyles = `
    w-full py-3 rounded-[10px] font-medium 
    ${touchEffect ? "transition-all duration-150 ease-in-out" : ""}
    select-none touch-manipulation
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  const variantStyles = {
    primary: `
      bg-main-blue ${textColor || "text-white"}
    `,
    kakao: `
      bg-[#FEE500] ${
        textColor || "text-[#333333]"
      } flex items-center justify-center relative
      ${
        touchEffect && !disabled
          ? "hover:bg-[#fdd800] active:bg-[#fcc700] hover:shadow-lg active:shadow-md"
          : ""
      }
    `,
  };

  const disabledStyles = disabled
    ? "!bg-[#ebebeb] !text-[#8c8c8c] !cursor-not-allowed pointer-events-none"
    : "";

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className} ${disabledStyles}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {icon && (
        <Image
          src={icon}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className={`absolute left-4 ${
            touchEffect ? "transition-all duration-150" : ""
          }`}
        />
      )}
      {icon ? <span className="text-center w-full">{text}</span> : text}
    </button>
  );
};
