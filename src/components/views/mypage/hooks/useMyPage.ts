import { useGetMe, useLogout } from "@/api/mypage/query";
import { GetMeResponse } from "@/api/mypage/types";
import { useModalStore } from "@/store/common/useModalStore";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import DeleteAccountContent from "../ui/DeleteAccountContent";

const useMyPage = (initialData?: ApiResponse<GetMeResponse>) => {
  const router = useRouter();
  const { openModal } = useModalStore();

  const { mutate: mutateLogout } = useLogout({
    onSuccess: () => {
      openModal("confirm", {
        title: "로그아웃",
        desc: "로그아웃이 완료되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/");
        },
      });
    },
  });

  const { mutate: mutateDeleteAccount } = useLogout({
    onSuccess: () => {
      openModal("confirm", {
        title: "회원탈퇴",
        desc: "회원탈퇴되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/");
        },
      });
    },
  });

  const { data } = useGetMe(initialData);

  const handleProfileClick = () => {
    router.push("/mypage/profile");
  };

  const handleLogout = () => {
    openModal("yesNo", {
      title: "로그아웃 확인",
      desc: "로그아웃하시겠습니까?",
      yesText: "로그아웃",
      noText: "취소",
      onYes: () => {
        mutateLogout();
      },
    });
  };

  const handleDeleteAccount = () => {
    openModal("yesNo", {
      title: "",
      desc: DeleteAccountContent(),
      yesText: "탈퇴하기",
      noText: "취소",
      onYes: () => {
        mutateDeleteAccount();
      },
    });
  };

  const mypageData = {
    payDetail: {
      title: "거래내역",
      onClick: () => router.push("/mypage/pay-detail"),
    },
    donation: {
      title: "기부내역",
      onClick: () => router.push("/mypage/donation"),
    },
    alertSetting: {
      title: "알림 설정",
      onClick: () => router.push("/mypage/alert-setting"),
    },
    inquiry: {
      title: "1:1 문의",
      onClick: () => router.push("/mypage/inquiry"),
    },
    inqueryHistory: {
      title: "문의내역",
      onClick: () => router.push("/mypage/inquiry-history"),
    },
    cancelAccount: {
      title: "회원 탈퇴",
      onClick: () => handleDeleteAccount(),
    },
  } as const;

  return {
    mypageData,
    handleProfileClick,
    profileData: data?.data,
    handleLogout,
  };
};

export { useMyPage };
