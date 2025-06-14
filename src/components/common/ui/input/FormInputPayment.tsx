import { ProfileFormData } from "@/app/(layoutCase)/rent-payment/add-base/data";
import classNames from "classnames";
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

export interface PaymentInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  errors: FieldErrors<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  pattern?: string;
  noOutline?: boolean;
  className?: string;
}
const baseStyles = "relative flex items-center bg-input-gray border border-input-gray rounded-md";
const disabledStyle = "disabled:opacity-50";
const focusStyle = "focus:outline-none";
const inputBaseStyles = "text-right w-full h-12 px-sm rounded-md text-sm  text-input-dark bg-input-gray";
const inputStyles = [inputBaseStyles, disabledStyle, focusStyle].join(" ");

const FormInputPayment: React.FC<PaymentInputProps<ProfileFormData>> = ({
  control,
  name,
  errors,
  placeholder = "",
  disabled,
  pattern,
  label,
}) => {
  // 숫자에 쉼표 포맷팅
  const formatNumberWithCommas = (value: string | number): string => {
    if (!value) return "";
    const cleanedValue = value.toString().replace(/,/g, "");
    return Number(cleanedValue).toLocaleString("ko-KR");
  };

  return (
    <div className={baseStyles}>
      <span className="whitespace-nowrap pl-2 text-gray-700 text-sm">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <input
            {...field}
            placeholder={placeholder}
            pattern={pattern}
            disabled={disabled}
            inputMode="numeric"
            className={classNames(inputStyles, {
              "border-status-error": errors[name],
            })}
            type="text" // type="number" 대신 text로 변경하여 쉼표 포맷팅 표시
            id="amount"
            value={formatNumberWithCommas(value)}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/,/g, "");
              onChange(inputValue ? Number(inputValue) : undefined);
            }}
          />
        )}
      />
      <span className="pr-2 text-gray-500">원</span>
    </div>
  );
};

export default FormInputPayment;
