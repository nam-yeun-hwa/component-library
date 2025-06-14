import { useGetPayDetailInfinite } from "@/api/mypage/query";
import { GetPayDetailResponse } from "@/api/mypage/types";
import { ApiResponse } from "@/types/api";
import { format, subMonths } from "date-fns";
import { useEffect, useRef, useState } from "react";

const useMyPagePayDetail = (
  initialData?: ApiResponse<GetPayDetailResponse>
) => {
  const [startDate, setStartDate] = useState<Date>(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPayDetailInfinite(
      format(startDate, "yyyy-MM-dd"),
      format(endDate, "yyyy-MM-dd"),
      initialData
    );

  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const statusHandler = (
    status: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  ) => {
    switch (status) {
      case "1":
        return "결제 완료"; // 결제성공
      case "2":
        return "결제 실패"; // 결제실패
      case "3":
        return "결제 취소"; // (본인)결제취소 카드사 및 할부 변경
      case "4":
        return "결제 취소"; // (본인)결제취소 송금액 변경
      case "5":
        return "결제 취소"; // (본인)결제취소 계약서 등록 어려움
      case "6":
        return "결제 취소"; // (본인)결제취소 송금일이 너무 이름
      case "7":
        return "결제 취소"; // (관리자)결제취소
      case "8":
        return "결제 대기"; // 결제대기
      default:
        return "알 수 없는 결제 타입";
    }
  };

  const paymentTypeHandler = (
    paymentType: "1" | "2" | "3" | "4" | "5" | "6" | "7"
  ) => {
    switch (paymentType) {
      case "1":
        return "자동납부";
      case "2":
        return "선불·미납";
      default:
        return "";
    }
  };

  const transferTypeHandler = (transferType: "0" | "1" | "2") => {
    switch (transferType) {
      case "1":
        return "송금 완료";
      case "2":
        return "송금 취소";
      default:
        return "송금 예정";
    }
  };

  const handleCancelPayment = (idx: string) => {
    console.log(idx);
    // TODO: 결제 취소 로직 구현
  };

  return {
    payDetailData: data,
    observerRef,
    isFetchingNextPage,
    handleStartDateChange,
    handleEndDateChange,
    statusHandler,
    paymentTypeHandler,
    handleCancelPayment,
    transferTypeHandler,
  };
};

export default useMyPagePayDetail;
