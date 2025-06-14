import {
  useDeleteInquiryHistory,
  useGetInquiryHistoryDetail,
} from "@/api/mypage/query";
import { GetInquiryHistoryResponse } from "@/api/mypage/types";
import { useModalStore } from "@/store/common/useModalStore";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";

const useInquiryHistoryDetail = (
  inquiryId: string,
  initialData?: ApiResponse<GetInquiryHistoryResponse>
) => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { data } = useGetInquiryHistoryDetail(inquiryId, initialData);
  const { mutate } = useDeleteInquiryHistory({
    onSuccess: () => {
      openModal("confirm", {
        title: "삭제 완료",
        desc: "문의가 삭제되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.back();
        },
      });
    },
  });

  const handleDeleteInquiry = () => {
    openModal("yesNo", {
      title: "문의 삭제",
      desc: "정말 이 문의를 삭제하시겠습니까?",
      yesText: "삭제",
      noText: "취소",
      onYes: () => {
        mutate(inquiryId);
      },
    });
  };
  return {
    inquiryHistoryDetail: data?.data,
    handleDeleteInquiry,
  };
};

export default useInquiryHistoryDetail;
