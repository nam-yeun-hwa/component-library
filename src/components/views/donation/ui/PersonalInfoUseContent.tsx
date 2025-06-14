"use client";
import React from "react";
import Link from "next/link";

const PersonalInfoUseContent = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="py-20 pt-8">
      <div className="bg-white flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex items-center justify-between mb-4">
          <div className="flex-1"></div>
          <button
            className="ml-auto rounded hover:bg-gray-100 transition"
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
        <section className="terms_area text-[#3B3B3B]">
          <h3 className="text-body-lg font-semibold mb-6">
            개인정보 수집·이용
          </h3>
          <ul className="space-y-6 text-gray-700 text-base">
            <li>
              <span className="text-[0.875rem]">
                사회복지공동모금회(이하“모금회”라 함)는 「개인정보 보호법」
                제15조 및 제22조에 의거하여 개인정보수집 및 이용에 관한
                정보주체의 동의절차를 준수하며, 고지 후 수집된 정보는 모금회의
                개인정보 수집 및 이용목적외의 용도로는 절대 이용·제공되지
                않습니다.
              </span>
            </li>
            <li>
              <h4 className="font-medium mb-4">1. 개인정보 수집·이용</h4>
              <table className="table-auto text-center border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100 text-[0.875rem] font-bold">
                    <th className="border px-4 py-2">항목</th>
                    <th className="border px-4 py-2">수집·이용 목적</th>
                    <th className="border px-4 py-2">보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[0.625rem] text-text-disabled font-medium leading-relaxed">
                    <td className="border px-4 py-2">
                      (필수) 성명, 생년월일, 연락처, 주소, e-mail
                    </td>
                    <td className="border px-4 py-2">
                      모금회에서 처리하는 기부관련 업무 (기부신청, 기부내역확인,
                      확인서 발급, 기부자서비스 등)
                    </td>
                    <td className="border px-4 py-2">
                      10년간 보존 후 파기 (관계법령에 의거)
                    </td>
                  </tr>
                </tbody>
              </table>
              <span className="text-[0.625rem] text-[#B3B3B3] mt-5">
                ※개인정보의 위탁회사 및 위탁업무의 구체적인 정보는 모금회
                홈페이지
                <Link
                  href="https://www.chest.or.kr"
                  className="text-blue-600 hover:underline"
                >
                  [https://www.chest.or.kr]
                </Link>
                하단 개인정보처리방침에서 확인할 수 있습니다.
                <div className="mt-1" ></div>
                ※위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
                그러나 동의를 거부할 경우 기부신청 및 이력확인, 기부자서비스 등
                기부관련업무에 제한을 받을 수 있습니다.
              </span>
            </li>
            <h4 className="text-lg font-medium">〈기타고지사항〉</h4>
            <li>
              <span className="text-[0.875rem]">
                개인정보보호법 제24조의2, 소득세법, 상속세 및 증여세법에 따라
                주민등록번호의 처리가 가능합니다.
              </span>
            </li>
            <table className="table-auto text-center border-collapse border border-gray-300 w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-[0.875rem] font-bold text-center">
                  <th className="w-1/4 border px-4 py-2">항목</th>
                  <th className="w-1/4 border px-4 py-2">수집·이용 목적</th>
                  <th className="w-1/4 border px-4 py-2">보유기간</th>
                  <th className="w-1/4 border px-4 py-2">수집근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[0.625rem] text-text-disabled font-medium leading-relaxed">
                  <td className="border px-4 py-2">주민등록번호</td>
                  <td className="border px-4 py-2">기부영수증 발급</td>
                  <td className="border px-4 py-2">10년</td>
                  <td className="border px-4 py-2">
                    소득세법 제160조의 3 및 시행령 제208조의 3, 상속세 및
                    증여세법 제51조
                  </td>
                </tr>
              </tbody>
            </table>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PersonalInfoUseContent;
