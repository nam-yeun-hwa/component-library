import { useCreateInquiry } from "@/api/mypage/query";
import { useModalStore } from "@/store/common/useModalStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface InquiryForm {
  type: "1" | "2" | "3"; // 1: 일반 문의, 2: 결제 관련, 3: 서비스이용문의
  content: string;
}

const useInquiry = () => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { mutate, isPending } = useCreateInquiry({
    onSuccess: () => {
      openModal("confirm", {
        title: "1:1 문의가 등록되었습니다.",
        desc: "확인하여 빠르게 답변드리겠습니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/mypage/inquiry-history");
        },
      });
    },
    onError: (error) => {
      console.error("문의 등록 중 오류 발생:", error);
    },
  });
  const { register, handleSubmit, watch } = useForm<InquiryForm>({
    defaultValues: {
      type: "1",
      content: "",
    },
  });

  const onSubmit = (data: InquiryForm) => {
    mutate(data);
  };

  const isButtonDisabled = watch("content").trim() === "";

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    isButtonDisabled,
    isPending,
  };
};

export default useInquiry;
