import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  SignupFormData,
  validationSchema,
} from "@/app/(layoutCase)/sign-up/formData";
import { useAuthStore } from "@/store/authStore";
import {
  useCheckEmailMutation,
  useSignUpMutation,
} from "@/api/sign-up/query/useSignUpQuery";
import { AxiosError } from "axios";
import { useModalStore } from "@/store/common/useModalStore";

interface ApiErrorResponse {
  code: string;
  message: string;
}

export const useSignUpForm = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const { openModal } = useModalStore();

  const { niceAuthInfo } = useAuthStore();
  const router = useRouter();
  const checkEmailMutation = useCheckEmailMutation();
  const signUpMutation = useSignUpMutation();

  const methods = useForm<SignupFormData>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      passwordCheck: "",
      email: "",
      emailDomain: "",
      marketing: true,
      name: niceAuthInfo?.name || "",
      di: niceAuthInfo?.di || "",
      phoneNumber: niceAuthInfo?.mobileno || "",
      gender: niceAuthInfo?.gender || "",
      birth: niceAuthInfo?.birthdate || "",
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const marketingChecked = watch("marketing");
  const email = watch("email");
  const emailDomain = watch("emailDomain");
  const name = watch("name");
  const di = watch("di");
  const phoneNumber = watch("phoneNumber");
  const gender = watch("gender");
  const birth = watch("birth");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  // 본인인증 정보가 변경될 때마다 폼 값 업데이트
  useEffect(() => {
    if (niceAuthInfo) {
      methods.setValue("name", niceAuthInfo.name);
      methods.setValue("di", niceAuthInfo.di);
      methods.setValue("phoneNumber", niceAuthInfo.mobileno);
      methods.setValue("gender", niceAuthInfo.gender);
      methods.setValue("birth", niceAuthInfo.birthdate);
    }
  }, [niceAuthInfo, methods]);

  // 이메일이 변경될 때마다 중복 확인 상태 초기화
  useEffect(() => {
    setIsEmailChecked(false);
  }, [email, emailDomain]);

  const toggleCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue("marketing", !marketingChecked);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const fullEmail = `${data.email}@${data.emailDomain}`;
      const signUpData = {
        email: fullEmail,
        name: data.name,
        di: data.di,
        phone_number: data.phoneNumber,
        gender: data.gender,
        password: data.password,
        re_password: data.passwordCheck,
        birth: data.birth,
        marketing_alarm: data.marketing ? "1" : "0",
      };

      await signUpMutation.mutateAsync(signUpData);

      openModal("confirm", {
        title: "회원가입 완료",
        desc: "회원가입이 완료되었습니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/login");
        },
      });
    } catch (error) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ApiErrorResponse;
        errorMessage = errorData.message || errorMessage;
      }

      openModal("confirm", {
        title: "회원가입 실패",
        desc: errorMessage,
        confirmText: "확인",
        onConfirm: () => {},
      });
    }
  };

  const onPressCheckEmail = async () => {
    try {
      const fullEmail = `${email}@${emailDomain}`;
      const result = await checkEmailMutation.mutateAsync({ email: fullEmail });

      if (result.code === "0000") {
        setIsEmailChecked(true);
        openModal("confirm", {
          title: "이메일 중복 확인",
          desc: "사용 가능한 이메일입니다.",
          confirmText: "확인",
          onConfirm: () => {},
        });
      } else {
        setIsEmailChecked(false);
        openModal("confirm", {
          title: "이메일 중복 확인",
          desc: result.message || "이메일 중복 확인 중 오류가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => {},
        });
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setIsEmailChecked(false);

      let errorMessage = "이메일 중복 확인 중 오류가 발생했습니다.";

      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ApiErrorResponse;
        switch (errorData.code) {
          case "4001":
            errorMessage = "이미 사용 중인 이메일입니다.";
            break;
          default:
            errorMessage = errorData.message || errorMessage;
        }
      }

      openModal("confirm", {
        title: "이메일 중복 확인",
        desc: errorMessage,
        confirmText: "확인",
        onConfirm: () => {},
      });
    }
  };

  const isFormComplete = Boolean(
    email &&
      emailDomain &&
      name &&
      di &&
      phoneNumber &&
      gender &&
      birth &&
      password &&
      passwordCheck &&
      isEmailChecked &&
      Object.keys(errors).length === 0
  );

  return {
    methods,
    register,
    errors,
    marketingChecked,
    isFormComplete,
    handleSubmit,
    onSubmit,
    onPressCheckEmail,
    toggleCheck,
  };
};
