import Image from "next/image";
import Link from "next/link";

/**
 * Header 컴포넌트
 *
 * @description
 * `Header`는 Next.js 기반 웹 애플리케이션에서 페이지 상단에 고정된 헤더 컴포넌트로, 로고 이미지, 서비스 설명 텍스트, 그리고 메뉴 버튼을 포함합니다.
 */
export default function HomeHeader() {
  return (
    <header className="px-7 bg-gray-100 h-[60px] flex items-center fixed top-0 w-full max-w-[600px] z-[2]">
      <div className="flex justify-between items-center w-full relative">
        <div className="flex flex-row items-center">
          <h1>
            <Image src="/images/library-logo.png" alt="Logo" width={45} height={60} priority />
          </h1>
          <span className="text-[0.675em]  text-[#8c8c8c] tracking-[-0.02em]">나의 포토폴리오</span>
        </div>
        <Link href={"/menu"}>
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75V0.25ZM1 1.75H19V0.25H1V1.75Z"
              fill="black"
            />
            <path
              d="M1 6.25C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75V6.25ZM1 7.75H19V6.25H1V7.75Z"
              fill="black"
            />
            <path
              d="M1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75V12.25ZM1 13.75H19V12.25H1V13.75Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
