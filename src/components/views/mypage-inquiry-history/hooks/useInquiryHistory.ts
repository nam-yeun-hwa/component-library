import { useGetInquiryHistory } from "@/api/mypage/query";
import { GetInquiryHistoryResponse } from "@/api/mypage/types";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";

const useInquiryHistory = (
  initialData?: ApiResponse<GetInquiryHistoryResponse[]>
) => {
  const router = useRouter();
  const { data } = useGetInquiryHistory(initialData);

  const handleGoToInquiryDetail = (idx: string) => {
    router.push(`/mypage/inquiry-history/${idx}`);
  };

  return {
    inquiryHistoryData: data?.data,
    isLoading: !data,
    handleGoToInquiryDetail,
  };
};

export default useInquiryHistory;
