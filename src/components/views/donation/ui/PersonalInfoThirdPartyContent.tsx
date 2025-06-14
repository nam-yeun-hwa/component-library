"use client";
import React from "react";

const PersonalInfoThirdPartyContent = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <div className="py-20 pt-8">
      <div className="mx-auto bg-white rounded-lg">
        {/* Header */}
        <header className="flex items-center justify-end mb-6">
          <button
            className="rounded hover:bg-gray-100 transition"
            onClick={onClick}
            aria-label="뒤로가기"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1847_9937)">
                <path
                  d="M5.46875 19.5312L19.5312 5.46875"
                  stroke="#333333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.46875 5.46875L19.5312 19.5312"
                  stroke="#333333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1847_9937">
                  <rect
                    width="25"
                    height="25"
                    fill="white"
                    transform="matrix(-1 0 0 -1 25 25)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </header>
        {/* Main Content */}
        <section className="terms_area">
          <h3 className="text-body-lg font-semibold mb-6">
            개인정보 제3자 제공·이용
          </h3>
          <ul className="space-y-6 text-gray-700 text-base">
            <li>
              <h4 className="mb-4">1. 개인정보 제3자 제공·이용</h4>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100 text-[0.875rem] font-bold text-center">
                    <th className="w-1/4 border px-4 py-2">제공받는 곳</th>
                    <th className="w-1/4 border px-4 py-2">항목</th>
                    <th className="w-1/4 border px-4 py-2">제공목적</th>
                    <th className="w-1/4 border px-4 py-2">제공기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[0.625rem] text-center text-text-disabled font-medium leading-relaxed">
                    <td className="border px-4 py-2">국세청</td>
                    <td className="border px-4 py-2">
                      성명, 주민등록번호, 기부일자, 기부금액
                    </td>
                    <td className="border px-4 py-2">
                      연말정산간소화 서비스 이용
                    </td>
                    <td className="border px-4 py-2">
                      국세청 소득공제 자료 공제시까지
                    </td>
                  </tr>
                  <tr className="text-[0.625rem] text-center text-text-disabled font-medium leading-relaxed">
                    <td className="border px-4 py-2">서울시 및 25개 자치구</td>
                    <td className="border px-4 py-2">
                      성명, 생년월일, 연락처, 주소, e-mail
                    </td>
                    <td className="border px-4 py-2">
                      기부안내를 위한 정보공유
                    </td>
                    <td className="border px-4 py-2">사업종료시까지</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[0.625rem] text-[#B3B3B3] mt-5">
                ※위의 개인정보 제3자 제공·이용에 대한 동의를 거부할 권리가
                있습니다. 단 거부할 경우 국세청 연말정산간소화서비스 또는
                기부안내서비스에 제한을 받을 수 있습니다.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PersonalInfoThirdPartyContent;
