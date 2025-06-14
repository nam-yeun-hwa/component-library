"use client";

import Image from "next/image";
import { CustomButton } from "../../ui/Button";
import TermsContent from "./TermsContent";
import { useTermsAgreement } from "../hooks/useTermsAgreement";
import { useTermsModalStore } from "@/store/common/useTermsModalStore";

const termsList = [
  {
    id: "terms",
    label: "렌탈페이 이용약관",
    required: true,
  },
  {
    id: "privacy",
    label: "개인정보 처리방침",
    required: true,
  },
  {
    id: "etc",
    label: "위치정보 이용동의 및 기타 서비스 이용약관",
    required: true,
  },
];

export default function TermsAgreement() {
  const {
    agreements,
    loading,
    allAgreed,
    toggleAgreement,
    toggleAll,
    getCheckboxIcon,
    onClickAgreement,
  } = useTermsAgreement();
  const { termId, openTermModal, closeTermModal } = useTermsModalStore();

  return (
    <div className="mx-auto px-4 max-w-[600px]">
      {/* 전체 동의 */}
      <div className="bg-[#f9f9f9] rounded-lg px-4 h-14 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleAll}
        >
          <Image
            src={getCheckboxIcon(allAgreed)}
            width={14}
            height={14}
            alt="전체 동의 체크박스"
          />
          <span
            className={`text-[16px] font-medium ${
              allAgreed ? "text-primary" : "text-black"
            }`}
          >
            필수 약관 모두 동의
          </span>
        </div>
      </div>

      {/* 각 약관 */}
      <div className="mt-[30px]">
        {termsList.map((term) => (
          <div
            key={term.id}
            className="flex justify-between h-[40px] mt-[10px] items-center cursor-pointer"
            onClick={() => toggleAgreement(term.id)}
          >
            <div className="flex items-center space-x-2">
              <Image
                src={getCheckboxIcon(agreements[term.id])}
                width={14}
                height={14}
                alt={`${term.label} 체크박스`}
              />
              <span
                className={`font-normal ${
                  agreements[term.id] ? "text-primary" : "text-black"
                }`}
              >
                {term.label}{" "}
                {term.required && (
                  <span className="text-primary font-normal">(필수)</span>
                )}
              </span>
            </div>

            {/* 화살표 클릭 시 모달 열기 */}
            <Image
              src={"/images/expand-arrow.svg"}
              width={20}
              height={20}
              alt={`${term.label} 화살표`}
              onClick={(e) => {
                e.stopPropagation();
                openTermModal(term.id);
              }}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* 에러 메시지 */}
      {/* {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-400 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-red-700">{error}</div>
          </div>
        </div>
      )} */}

      {/* 동의 버튼 */}
      <div>
        <CustomButton
          text={loading ? "처리중..." : "동의합니다"}
          onClick={onClickAgreement}
          className={`mt-[70px] h-[48px] ${
            allAgreed && !loading
              ? "bg-[#0099ff] text-white"
              : "bg-[#ebebeb] text-[#8c8c8c] cursor-default"
          }`}
          touchEffect={false}
          disabled={loading || !allAgreed}
        />
      </div>

      {/* 약관 상세 모달 */}
      {termId && (
        <div className="fixed bg-white z-100 max-w-[600px] inset-0 h-full mx-auto">
          <div className="h-full flex flex-col">
            {/* 컨텐츠 */}
            <div className="flex flex-col overflow-y-auto p-4 max-w-[600px] border">
              <TermsContent termId={termId} onClick={closeTermModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
