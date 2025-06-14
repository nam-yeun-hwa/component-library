import { useForm } from "react-hook-form";
import {
  ChangePasswordForm,
  changePasswordSchema,
} from "../types/changePassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdatePassword } from "@/api/mypage/query";
import { useModalStore } from "@/store/common/useModalStore";
import { useRouter } from "next/navigation";

const useChangePassword = () => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { isPending, mutate } = useUpdatePassword({
    onSuccess: () => {
      openModal("confirm", {
        title: "비밀번호 변경",
        desc: "비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.",
        confirmText: "확인",
        onConfirm: () => {
          router.push("/login");
        },
      });
    },
    onError: () => {
      openModal("confirm", {
        title: "비밀번호 변경",
        desc: "비밀번호 변경에 실패했습니다. 고객센터에 문의해주세요.",
        confirmText: "확인",
        onConfirm: () => {},
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      new_password: "",
      re_password: "",
    },
  });

  const onSubmit = (data: ChangePasswordForm) => {
    mutate(data);
  };

  const isButtonDisabled =
    Object.keys(errors).length > 0 ||
    watch("password") === "" ||
    watch("new_password") === "" ||
    watch("re_password") === "";

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    isButtonDisabled,
  };
};

export default useChangePassword;
