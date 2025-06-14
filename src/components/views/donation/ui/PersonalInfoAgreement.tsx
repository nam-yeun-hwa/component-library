"use client";

import Image from "next/image";
import PersonalInfoContent from "./PersonalInfoContent";
import { usePersonalModalStore } from "@/store/common/usePersonalModalStore";

type terms = {
  id: string;
  label: string;
  required: boolean;
};

interface PersonalInfoAgreementProps {
  termsList: terms[];
  agreements: Record<string, boolean>;
  toggleAgreement: (id: string) => void;
}

export default function PersonalInfoAgreement({
  termsList,
  agreements,
  toggleAgreement,
}: PersonalInfoAgreementProps) {

  const { termId, openTermModal, closeTermModal } = usePersonalModalStore();

  return (
    <div className="px-4 max-w-[600px]">
      {/* 각 약관 */}
      <div>
        {termsList.map((term) => (
          <div
            key={term.id}
            className="flex justify-between h-[40px] mt-[10px] items-center cursor-pointer"
            onClick={() => toggleAgreement(term.id)}
          >
            <div className="flex items-center space-x-2 text-[13px]">
              <img
                src={agreements[term.id] ? "/images/checkbox2_on.svg" : "/images/checkbox2.svg"}
                alt={`${term.label} 체크박스`}
              />
              <span
                className={`font-normal flex items-center gap-1 ${
                  agreements[term.id] ? "text-primary" : "text-black"
                }`}
              >
                {term.required && (
                  <span className="text-[#0099FF] leading-none">[필수]</span>
                )}{" "}
                <span className="leading-none align-middle">{term.label}</span>
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

      {/* 약관 상세 모달 */}
      {termId && (
        <div className="fixed bg-white z-100 max-w-[600px] inset-0 h-full mx-auto">
          <div className="h-full flex flex-col">
            {/* 컨텐츠 */}
            <div className="flex flex-col overflow-y-auto p-4 max-w-[600px]">
              <PersonalInfoContent termId={termId} onClick={closeTermModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
