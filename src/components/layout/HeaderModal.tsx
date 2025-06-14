"use client";

import { useRouter } from "next/navigation";

/**
 * HeaderPage 컴포넌트
 * @description
 * `HeaderPage`는 Next.js 기반 웹 애플리케이션에서 페이지 상단에 표시되는 재사용 가능한 헤더 컴포넌트입니다.
 * 이 컴포넌트는 동적으로 설정된 제목과 뒤로 가기 버튼을 제공하여, 사용자가 이전 페이지로 쉽게 이동할 수 있도록 합니다.
 */
export default function HeaderModal() {
  const router = useRouter();
  return (
    <header className="flex relative px-5 flex-end items-center h-[60px]">
      <button
        className="absolute right-5 px-1.5"
        onClick={() => {
          router.back();
        }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1847_9937)">
            <path
              d="M5.46875 19.5312L19.5312 5.46875"
              stroke="#333333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5.46875 5.46875L19.5312 19.5312"
              stroke="#333333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_1847_9937">
              <rect
                width="25"
                height="25"
                fill="white"
                transform="matrix(-1 0 0 -1 25 25)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
    </header>
  );
}
