"use client";
import classNames from "classnames";
import { useRouter } from "next/navigation";

interface HeaderPageProps {
  locatedTitle: string; //page 이름
  className?: string;
}

/**
 * HeaderPage 컴포넌트
 * @description
 * `HeaderPage`는 Next.js 기반 웹 애플리케이션에서 페이지 상단에 표시되는 재사용 가능한 헤더 컴포넌트입니다.
 * 이 컴포넌트는 동적으로 설정된 제목과 뒤로 가기 버튼을 제공하여, 사용자가 이전 페이지로 쉽게 이동할 수 있도록 합니다.
 */
export default function PageHeader({ locatedTitle, className }: HeaderPageProps) {
  const router = useRouter();
  return (
    <header className={classNames(
      " bg-white flex items-center !fixed top-0 w-full max-w-[600px] z-[2]  px-5 justify-center h-[60px]"
      ,className
    )}>
      <button
        className="absolute left-5 px-1.5"
        onClick={() => {
          router.back();
        }}
      >
        <svg
          width="11"
          height="17"
          viewBox="0 0 11 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5625 1.08555L9.4709 0.0625001L0.4375 8.5L9.4709 16.9375L10.5625 15.9197L2.62598 8.5L10.5625 1.08555Z"
            fill="black"
          ></path>
        </svg>
      </button>
      <h2 className="text-base font-semibold  text-center">{locatedTitle}</h2>
    </header>
  );
}
