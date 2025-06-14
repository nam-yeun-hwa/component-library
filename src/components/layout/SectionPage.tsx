import classNames from "classnames";
import { ReactNode } from "react";

interface SectionPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  bgWhite?: boolean;
  classname?: string;
}

/**
 * 페이지의 섹션을 위한 레이아웃 컴포넌트입니다.
 * 일관된 패딩, 유연한 컬럼 레이아웃, 스크롤 가능한 컨텐츠 영역을 제공합니다.
 * 배경은 기본 그레이와 화이트 두가지로 구분 됩니다.
 */
const SectionPage = ({ children, bgWhite, className }: SectionPageProps) => {
  return (
    <section
      style={{ height: "calc(100vh - 60px)" }}
      className={classNames(
        `relative px-6 flex w-full flex-col overflow-scroll flex-1 bg-[#f8f9fb] pt-[60px] pb-[92px]`,
        { "bg-white": bgWhite },
        className
      )}
    >
      {children}
    </section>
  );
};

export default SectionPage;
