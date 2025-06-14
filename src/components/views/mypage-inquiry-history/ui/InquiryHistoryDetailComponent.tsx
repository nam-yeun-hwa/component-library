"use client";

import { GetInquiryHistoryResponse } from "@/api/mypage/types";
import SectionPage from "@/components/layout/SectionPage";
import { ApiResponse } from "@/types/api";
import useInquiryHistoryDetail from "../hooks/useInquiryHistoryDetail";
import Button from "@/components/common/ui/Button";

interface InquiryHistoryDetailComponentProps {
  initialData?: ApiResponse<GetInquiryHistoryResponse>;
  inquiryIdx: string;
}

const InquiryHistoryDetailComponent = ({
  initialData,
  inquiryIdx,
}: InquiryHistoryDetailComponentProps) => {
  const { inquiryHistoryDetail, handleDeleteInquiry } = useInquiryHistoryDetail(
    inquiryIdx,
    initialData
  );

  return (
    <SectionPage bgWhite>
      <div className="mt-4 space-y-4">
        <StatusBadge
          statusName={inquiryHistoryDetail?.status_name ?? "답변대기"}
        />
        <p>{inquiryHistoryDetail?.content}</p>
        <p className="text-caption-default text-caption-gray">
          {inquiryHistoryDetail?.inquiry_date}
        </p>
        <div className="w-full h-[2px] bg-[#f7f7f7]" />
        {inquiryHistoryDetail?.response_content && (
          <>
            <h1 className="text-main-blue font-bold text-body-lg">답변</h1>
            <div>{inquiryHistoryDetail?.response_content}</div>
            <p className="text-caption-default text-caption-gray">
              {inquiryHistoryDetail?.answer_date}
            </p>
          </>
        )}
        <div className="absolute bottom-[20px] left-0 w-full px-6 text-center">
          <Button variant="outlineDanger" onClick={handleDeleteInquiry}>
            삭제하기
          </Button>
        </div>
      </div>
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
      <span className="w-fit rounded-box-md border-[1px] border-solid border-main-blue text-caption-default text-main-blue flex justify-center items-center px-[6px] py-[2px]">
        {statusName}
      </span>
    );
  }
  return (
    <span className="w-fit rounded-box-md bg-main-blue text-white text-caption-default flex justify-center items-center px-[6px] py-[2px]">
      {statusName}
    </span>
  );
};

export default InquiryHistoryDetailComponent;
