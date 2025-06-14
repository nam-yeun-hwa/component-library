import * as Yup from "yup";

export interface ChangePasswordForm {
  password: string;
  new_password: string;
  re_password: string;
}

export const changePasswordSchema: Yup.ObjectSchema<ChangePasswordForm> =
  Yup.object({
    password: Yup.string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        "영문, 숫자, 특수문자를 포함해주세요."
      ),
    new_password: Yup.string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        "영문, 숫자, 특수문자를 포함해주세요."
      ),
    re_password: Yup.string()
      .required("비밀번호를 다시 입력해주세요.")
      .oneOf([Yup.ref("new_password")], "비밀번호가 일치하지 않습니다."),
  }) as Yup.ObjectSchema<ChangePasswordForm>;
