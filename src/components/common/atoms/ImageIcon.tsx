import Image from "next/image";
import { FC } from "react";

// Props 타입 정의
interface ImageIconProps {
  src: string; // 이미지 경로
  alt?: string; // 접근성을 위한 alt 텍스트
  width?: number; // 이미지 너비
  height?: number; // 이미지 높이
  priority?: boolean; // 우선 로드 여부
  className?: string; // 추가적인 CSS 클래스
}

const ImageIcon: FC<ImageIconProps> = ({ src, alt = "Icon", width = 24, height = 24, priority = false, className }) => {
  return <Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />;
};

export default ImageIcon;
