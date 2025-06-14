import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useNiceAuth } from "@/hooks/auth/useNiceAuth";
import { useCheckUserMutation } from "@/api/terms/query/useCheckUserQuery";

interface UseTermsAgreementReturn {
  selectedTerm: string | null;
  agreements: Record<string, boolean>;
  loading: boolean;
  error: string | null;
  allAgreed: boolean;
  toggleAgreement: (id: string) => void;
  toggleAll: () => void;
  getCheckboxIcon: (checked: boolean) => string;
  onClickAgreement: () => Promise<void>;
  openTermModal: (termId: string) => void;
  closeTermModal: () => void;
}

interface ApiError {
  response?: {
    data?: {
      code: string;
    };
  };
}

export const useTermsAgreement = (): UseTermsAgreementReturn => {
  const router = useRouter();
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    terms: false,
    privacy: false,
    etc: false,
  });
  const [state, actions] = useNiceAuth();
  const { loading, error, isCompleted, userInfo } = state;
  const setNiceAuthInfo = useAuthStore((state) => state.setNiceAuthInfo);
  const checkUserMutation = useCheckUserMutation();
  const [isChecking, setIsChecking] = useState(false);

  const allAgreed = Object.values(agreements).every(Boolean);

  const toggleAgreement = (id: string) => {
    setAgreements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const newState = !allAgreed;
    const updated = Object.fromEntries(
      termsList.map((term) => [term.id, newState])
    );
    setAgreements(updated);
  };

  const getCheckboxIcon = (checked: boolean) =>
    checked ? "/images/checkbox2_on.svg" : "/images/checkbox2.svg";

  const onClickAgreement = async () => {
    if (!allAgreed) return;

    try {
      await actions.startFullAuthentication();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  // 인증 상태 변화 감지
  useEffect(() => {
    const checkUserAndNavigate = async () => {
      if (isCompleted && userInfo && !isChecking) {
        setIsChecking(true);

        // NICE 인증 정보를 store에 저장
        setNiceAuthInfo({
          name: userInfo.name,
          birthdate: userInfo.birthdate,
          gender: userInfo.gender,
          mobileno: userInfo.mobileno,
          mobileco: userInfo.mobileco,
          di: userInfo.di,
          ci: userInfo.ci,
        });

        try {
          // 회원 중복 체크
          const result = await checkUserMutation.mutateAsync({
            name: userInfo.name,
            di: userInfo.di,
            phone_number: userInfo.mobileno,
          });
          console.log("🚀 ~ checkUserAndNavigate ~ result:", result);

          if (result.code === "0000") {
            // 중복 회원이 아닌 경우 회원가입 페이지로 이동
            router.push("/sign-up");
          } else if (result.code === "4001") {
            // 이미 가입된 회원인 경우 alert 표시 후 로그인 페이지로 이동
            alert("이미 가입된 회원입니다.");
            router.push("/login");
          }
        } catch (error: unknown) {
          const apiError = error as ApiError;
          if (apiError.response?.data?.code === "4001") {
            // 이미 가입된 회원인 경우 alert 표시 후 로그인 페이지로 이동
            alert("이미 가입된 회원입니다.");
            router.push("/login");
          } else {
            // 기타 에러의 경우 회원가입 페이지로 이동
            router.push("/sign-up");
          }
        } finally {
          setIsChecking(false);
        }
      }
    };

    checkUserAndNavigate();
  }, [
    isCompleted,
    userInfo,
    setNiceAuthInfo,
    router,
    checkUserMutation,
    isChecking,
  ]);

  const openTermModal = (termId: string) => {
    setSelectedTerm(termId);
  };

  const closeTermModal = () => {
    setSelectedTerm(null);
  };

  return {
    selectedTerm,
    agreements,
    loading,
    error,
    allAgreed,
    toggleAgreement,
    toggleAll,
    getCheckboxIcon,
    onClickAgreement,
    openTermModal,
    closeTermModal,
  };
};

const termsList = [
  {
    id: "terms",
    label: "렌탈페이 이용약관",
    required: true,
  },
  {
    id: "privacy",
    label: "개인정보 처리방침",
    required: true,
  },
  {
    id: "etc",
    label: "위치정보 이용동의 및 기타 서비스 이용약관",
    required: true,
  },
];
