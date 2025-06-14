"use client";

import { GetInquiryHistoryResponse } from "@/api/mypage/types";
import SectionPage from "@/components/layout/SectionPage";
import { ApiResponse } from "@/types/api";
import useInquiryHistory from "../hooks/useInquiryHistory";
import Image from "next/image";

interface InquiryHistoryComponentProps {
  initialData?: ApiResponse<GetInquiryHistoryResponse[]>;
}

const InquiryHistoryComponent = ({
  initialData,
}: InquiryHistoryComponentProps) => {
  const { inquiryHistoryData, handleGoToInquiryDetail } =
    useInquiryHistory(initialData);

  return (
    <SectionPage bgWhite>
      {inquiryHistoryData && inquiryHistoryData.length > 0 ? (
        inquiryHistoryData.map((inquiryHistory) => (
          <div
            key={inquiryHistory.idx}
            className="py-4 flex justify-between border-b-[1px] border-button-disabled border-solid cursor-pointer"
            onClick={() => handleGoToInquiryDetail(inquiryHistory.idx)}
          >
            <div className="w-5/6">
              <div className="flex gap-2 items-center mb-2">
                <StatusBadge statusName={inquiryHistory.status_name} />
                <p className="text-caption-default text-caption-gray">
                  {inquiryHistory.created_at}
                </p>
              </div>
              <p className="w-full truncate">{inquiryHistory.content}</p>
            </div>
            <Image
              src="/images/right-arrow.svg"
              alt="right-arrow"
              width={20}
              height={20}
            />
          </div>
        ))
      ) : (
        <div>
          <p className="text-center text-body-lg text-caption-gray">
            문의 내역이 없습니다.
          </p>
        </div>
      )}
    </SectionPage>
  );
};

const StatusBadge = ({
  statusName,
}: {
  statusName: "답변대기" | "답변완료";
}) => {
  if (statusName === "답변대기") {
    return (
      <div className="w-fit rounded-box-md border-[1px] border-solid border-main-blue text-caption-default text-main-blue flex justify-center items-center px-[6px] py-[2px]">
        {statusName}
      </div>
    );
  }
  return (
    <div className="w-fit rounded-box-md bg-main-blue text-white text-caption-default flex justify-center items-center px-[6px] py-[2px]">
      {statusName}
    </div>
  );
};

export default InquiryHistoryComponent;
