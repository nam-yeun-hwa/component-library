// import newStyled from "@emotion/styled";
// import Button from "./Button";
// import { ErrorMessage, Input, InputLabel } from "../../styles/InputStyles";
// import { FormInput } from "../../common/ui/input/FormInput";
// import { FieldErrors, UseFormRegisterReturn, ValidationRule } from "react-hook-form";

// interface ResetPasswordProps {
//   onClick: () => void;
//   old_register: UseFormRegisterReturn; // react-hook-form의 register 객체
//   newPassword_register: UseFormRegisterReturn;
//   confirmNewPassword_register: UseFormRegisterReturn;
//   name: string; // 필드 이름 (예: email, estate_name)
//   errors: FieldErrors; // 폼 에러 객체
//   required?: boolean; // 필수 여부
//   placeholder?: string; // 플레이스홀더 텍스트
//   validationMessage?: string; // 필수 입력 에러 메시지
//   inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined; // 키보드 입력 모드 (예: numeric)
//   pattern?: string; // HTML pattern 속성
//   validationRules?: {
//     minLength?: ValidationRule;
//     maxLength?: ValidationRule;
//     pattern?: ValidationRule;
//   }; // 부모로부터 받은 유효성 검사 규칙
//   disabled?: boolean;
// }

// const PasswordReset: React.FC<ResetPasswordProps> = ({
//   onClick,
//   old_register,
//   newPassword_register,
//   confirmNewPassword_register,
//   name,
//   errors,
//   required = false,
//   placeholder = "",
//   validationMessage = "이 필드는 필수입니다.", // 기본 에러 메시지
//   inputMode = "text",
//   pattern,
//   validationRules, // 유효성 검사 규칙 (사용하지 않음, 부모에서 처리)
//   disabled,
// }) => {
//   return (
//     <ResetPasswordWrapper>
//       <InputLabel>비밀번호</InputLabel>
//       <InputWrap>
//         <Subtitle>현재 비밀번호</Subtitle>
//         <Input
//           type="password"
//           {...old_register}
//           onChange={old_register.onChange}
//           placeholder={placeholder}
//           pattern={pattern}
//           disabled={disabled}
//           inputMode={inputMode}
//         />
//       </InputWrap>

//       {errors[name] && <ErrorMessage>{required ? validationMessage : ""}</ErrorMessage>}
//       <InputWrap>
//         <Subtitle>새 비밀번호</Subtitle>
//         <Input
//           type={"password"}
//           {...newPassword_register}
//           onChange={newPassword_register.onChange}
//           placeholder={placeholder}
//           pattern={pattern}
//           disabled={disabled}
//           inputMode={inputMode}
//         />
//       </InputWrap>

//       {errors[name] && <ErrorMessage>{required ? validationMessage : ""}</ErrorMessage>}
//       <InputWrap>
//         <Subtitle>새 비밀번호 확인</Subtitle>
//         <Input
//           type={"password"}
//           {...confirmNewPassword_register}
//           onChange={confirmNewPassword_register.onChange}
//           placeholder={placeholder}
//           pattern={pattern}
//           disabled={disabled}
//           inputMode={inputMode}
//         />
//       </InputWrap>

//       {errors[name] && <ErrorMessage>{required ? validationMessage : ""}</ErrorMessage>}
//     </ResetPasswordWrapper>
//   );
// };

// export default PasswordReset;

// const ResetPasswordWrapper = newStyled.div<{}>`
// 	display: flex;
// 	flex-direction: column;
// 	gap:5px;
// `;

// const InputWrap = newStyled.div<{}>`
// 	display: flex;
// 	flex-direction: column;
// 	gap:10px;
// 	margin-top: 10px;
// `;

// const Subtitle = newStyled.div<{}>`
// 	font-size: 14px;
//     color: cornflowerblue;
//     font-weight: 200;
//     opacity: 0.8;
// `;
