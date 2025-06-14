"use client";

import Accordion from "@/components/common/ui/Accordion";
import DatePickerButton from "@/components/common/ui/date/DatePickerButton";
import SectionPage from "@/components/layout/SectionPage";
import MyPagePayDetailTabs from "@/components/views/mypage-pay-detail/ui/MyPagePayDetailTabs";
import { subMonths } from "date-fns";
import Image from "next/image";
import useMyPagePayDetail from "../hooks/useMyPagePayDetail";
import { ApiResponse } from "@/types/api";
import { GetPayDetailResponse } from "@/api/mypage/types";
import {
  DropdownItem,
  DropdownMenu,
} from "@/components/common/ui/DropdownMenu";

interface MyPagePayDetailComponentProps {
  initialData?: ApiResponse<GetPayDetailResponse>; // Replace with the actual type if available
}

const MyPagePayDetailComponent = ({
  initialData,
}: MyPagePayDetailComponentProps) => {
  const {
    handleStartDateChange,
    handleEndDateChange,
    // isFetchingNextPage,
    observerRef,
    payDetailData,
    paymentTypeHandler,
    statusHandler,
    handleCancelPayment,
    transferTypeHandler,
  } = useMyPagePayDetail(initialData);
  console.log(payDetailData);
  return (
    <SectionPage>
      <nav className="relative bg-white ml-[-24px] mr-[-24px]  mb-[30px] ">
        <MyPagePayDetailTabs tabName="월세" />
      </nav>
      <div className="mb-[20px]">
        <h2 className="font-semibold mb-[20px]">기간조회</h2>
        <div className="flex items-center">
          <DatePickerButton
            defaultDate={subMonths(new Date(), 1)}
            className="w-full"
            onChange={handleStartDateChange}
          />
          <span className="mx-2">~</span>
          <DatePickerButton
            defaultDate={new Date()}
            className="w-full"
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#EBEBEB] mb-[20px]" />
      <h2 className="font-semibold mb-[20px]">거래내역</h2>
      <div className="space-y-4">
        {payDetailData?.pages.map((page, i) => (
          <div key={i} className="space-y-4">
            {page.data && page.data.list.length > 0 ? (
              page.data?.list.map((item) => (
                <Accordion
                  key={item.idx}
                  header={
                    <div className="flex items-center gap-2 flex-wrap">
                      <Image
                        src="/images/scroll.png"
                        alt="Scroll Icon"
                        width={22}
                        height={22}
                      />
                      <span className="font-semibold text-sm">
                        {item.address}
                      </span>
                      <span className="text-xs text-[#B3B3B3]">
                        {item.created_at.split(" ")[0]}
                      </span>
                    </div>
                  }
                >
                  <div className="p-[14px] space-y-4">
                    <div className="flex gap-2 items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <i
                          className={`rounded-full w-[6px] h-[6px] ${
                            item.status_idx === "1"
                              ? "bg-[#FEC872]"
                              : item.transfer_status_idx === "1"
                              ? "bg-[#3DB15B]"
                              : "bg-black"
                          }`}
                        />
                        <h4 className="text-sm font-semibold">
                          {["1", "2"].includes(item.payment_type_idx) &&
                            `${item.payment_period}개월치`}{" "}
                          {item.transfer_status_idx === "1"
                            ? "송금완료"
                            : statusHandler(item.status_idx)}
                        </h4>

                        {item.payment_type_idx === "1" ||
                          (item.payment_type_idx === "2" && (
                            <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center">
                              {paymentTypeHandler(item.payment_type_idx)}
                            </span>
                          ))}
                        {item.payment_type_idx === "1" && (
                          <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                            선납결제
                          </span>
                        )}
                        {item.payment_type_idx === "5" && (
                          <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                            연세결제
                          </span>
                        )}
                        {item.split_payment === "1" && (
                          <span className="font-semibold text-[11px] bg-main-blue text-white rounded-[4px] px-[5px] py-[4px] flex items-center justify-center leading-none">
                            분납 ›
                          </span>
                        )}
                      </div>
                      {item.status_idx === "1" &&
                        item.transfer_status_idx === "0" && (
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
                              onClick={() => handleCancelPayment(item.idx)}
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
                          {statusHandler(item.status_idx)}
                        </p>
                        <p className="text-[10px] text-gray-dark-100">
                          {item.created_at.split(" ")[0]}
                        </p>
                      </div>
                      <p className="text-caption-default font-bold">
                        {Number(item.transfer_amount).toLocaleString()}원
                      </p>
                    </div>
                    {item.status_idx === "1" ||
                      (item.status_idx === "2" && (
                        <div className=" flex justify-between items-center">
                          <div>
                            <p className="text-caption-sm text-gray-dark-500">
                              {transferTypeHandler(item.transfer_status_idx)}
                            </p>
                            <p className="text-[10px] text-gray-dark-100">
                              {item.transfer_date.split(" ")[0]}
                            </p>
                          </div>
                          <p className="text-caption-default font-bold">
                            {Number(
                              item.good_landlord === "Y"
                                ? item.transfer_amount
                                : item.payment_amount
                            ).toLocaleString()}
                            원
                          </p>
                        </div>
                      ))}
                  </div>
                </Accordion>
              ))
            ) : (
              <div className="flex items-center justify-center p-[30px] rounded-[10px] flex-col bg-white shadow-sm">
                <h4 className="font-bold text-[18px] mb-2 ">
                  거래한 내역이 없습니다.
                </h4>
                <p className="text-gray-dark-300 text-caption-default mb-4">
                  렌탈페이로 간편하게 월세 관리를 이용해보세요.
                </p>
                <Image
                  src="/images/empty.png"
                  alt="empty"
                  width={100}
                  height={79}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div ref={observerRef} style={{ height: 1 }} />

      {/* TODO: 로딩 UI 설계 필요 */}
      {/* {isFetchingNextPage && <p>Loading more...</p>} */}
    </SectionPage>
  );
};

export default MyPagePayDetailComponent;
