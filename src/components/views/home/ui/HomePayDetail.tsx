"use client";

import Accordion from "@/components/common/ui/Accordion";
import Image from "next/image";
import { ApiResponse } from "@/types/api";
import useHomePayDetail from "../hooks/useHomePayDetail";
import { GetRecentPayDetailResponse } from "@/api/home/types";
import {
  DropdownItem,
  DropdownMenu,
} from "@/components/common/ui/DropdownMenu";

interface HomePayDetailComponentProps {
  initialData?: ApiResponse<GetRecentPayDetailResponse>; // Replace with the actual type if available
}

const HomePayDetail = ({ initialData }: HomePayDetailComponentProps) => {
  const {
    payDetailData,
    handleGoToPayDetail,
    handleCancelPayment,
    paymentTypeHandler,
    statusHandler,
    transferTypeHandler,
  } = useHomePayDetail(initialData);

  return (
    <div className="space-y-4">
      {payDetailData?.data?.list.map((payDetail) => (
        <Accordion
          key={payDetail.idx}
          header={
            <div className="flex items-center gap-2 flex-wrap">
              <Image
                src="/images/scroll.png"
                alt="Scroll Icon"
                width={22}
                height={22}
              />
              <span className="font-semibold text-sm">{payDetail.address}</span>
              <span className="text-xs text-[#B3B3B3]">
                {payDetail.created_at.split(" ")[0]}
              </span>
            </div>
          }
        >
          <div className="p-[14px] space-y-4">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <i
                  className={`rounded-full w-[6px] h-[6px] ${
                    payDetail.status_idx === "1"
                      ? "bg-[#FEC872]"
                      : payDetail.transfer_status_idx === "1"
                      ? "bg-[#3DB15B]"
                      : "bg-black"
                  }`}
                />
                <h4 className="text-sm font-semibold">
                  {["1", "2"].includes(payDetail.payment_type_idx) &&
                    `${payDetail.payment_period}개월치`}{" "}
                  {payDetail.transfer_status_idx === "1"
                    ? "송금완료"
                    : statusHandler(payDetail.status_idx)}
                </h4>

                {payDetail.payment_type_idx === "1" ||
                  (payDetail.payment_type_idx === "2" && (
                    <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center">
                      {paymentTypeHandler(payDetail.payment_type_idx)}
                    </span>
                  ))}
                {payDetail.payment_type_idx === "1" && (
                  <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                    선납결제
                  </span>
                )}
                {payDetail.payment_type_idx === "5" && (
                  <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                    연세결제
                  </span>
                )}
                {payDetail.split_payment === "1" && (
                  <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                    분납 ›
                  </span>
                )}
              </div>

              {payDetail.status_idx === "1" &&
                payDetail.transfer_status_idx === "0" && (
                  <DropdownMenu
                    position="bottom-right"
                    buttonLabel={
                      <Image
                        src="/images/config.svg"
                        alt="설정 버튼"
                        width={12}
                        height={12}
                      />
                    }
                  >
                    <DropdownItem
                      onClick={() => handleCancelPayment(payDetail.idx)}
                    >
                      <Image
                        src="/images/pencil2.svg"
                        alt="취소"
                        width={12}
                        height={12}
                      />
                      결제 취소
                    </DropdownItem>
                  </DropdownMenu>
                )}
            </div>
            <div className=" flex justify-between items-center">
              <div>
                <p className="text-caption-sm text-gray-dark-500">
                  {statusHandler(payDetail.status_idx)}
                </p>
                <p className="text-[10px] text-gray-dark-100">
                  {payDetail.created_at.split(" ")[0]}
                </p>
              </div>
              <p className="text-caption-default font-bold">
                {Number(payDetail.transfer_amount).toLocaleString()}원
              </p>
            </div>
            {payDetail.status_idx === "1" ||
              (payDetail.status_idx === "2" && (
                <div className=" flex justify-between items-center">
                  <div>
                    <p className="text-caption-sm text-gray-dark-500">
                      {transferTypeHandler(payDetail.transfer_status_idx)}
                    </p>
                    <p className="text-[10px] text-gray-dark-100">
                      {payDetail.transfer_date.split(" ")[0]}
                    </p>
                  </div>
                  <p className="text-caption-default font-bold">
                    {Number(
                      payDetail.good_landlord === "Y"
                        ? payDetail.transfer_amount
                        : payDetail.payment_amount
                    ).toLocaleString()}
                    원
                  </p>
                </div>
              ))}
          </div>
        </Accordion>
      ))}
      <button
        className="rounded-[50px] bg-white flex items-center justify-center py-[10px] px-[30px] text-[13px] text-gray-dark-300 mx-auto"
        onClick={handleGoToPayDetail}
      >
        더보기 +
      </button>
    </div>
  );
};

export default HomePayDetail;
