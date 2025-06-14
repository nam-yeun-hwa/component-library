import classNames from "classnames";
import { ReactNode } from "react";

/**
 * RoundSection 컴포넌트의 props 인터페이스
 * @interface RoundSectionProps
 */
interface RoundSectionProps {
  type?: "border";
  children: ReactNode;
  classname?: string;
}

const borderStyle = "border border-main-blue p-6 rounded-lg  flex items-center justify-center gap-16 mt-2";

const normalStyle = "bg-white p-5 rounded-lg flex flex-col justify-start w-full mt-4 shadow-sm gap-y-2.5 ";

/**
 * 둥근 모서리와 그림자 효과가 적용된 스타일 섹션 컴포넌트
 * @param {RoundSectionProps} props - 컴포넌트 props
 * @param {ReactNode} props.children - 섹션 내부에 렌더링할 콘텐츠
 * @param {string} [props.className] - 추가 CSS 클래스 (선택적)
 */
const RoundSection = ({ children, classname, type }: RoundSectionProps) => {
  return <div className={classNames(type === "border" ? borderStyle : normalStyle, classname)}>{children}</div>;
};

export default RoundSection;
