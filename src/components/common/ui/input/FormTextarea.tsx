import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
}

const FormTextarea: React.FC<TextareaFieldProps> = ({
  name,
  placeholder,
  register,
  error,
  rows = 14,
  maxLength = 500,
  disabled = false,
  className,
  ...props
}) => {
  const [length, setLength] = useState(0);

  return (
    <div className="flex flex-col space-y-1">
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        {...register}
        onChange={(e) => {
          register.onChange(e);
          setLength(e.target.value.length);
        }}
        style={{
          resize: "none",
        }}
        className={`p-2 rounded-box-md bg-input-gray ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        {...props}
      />
      <div className="text-caption-default text-caption-gray text-right">
        {length} / {maxLength}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormTextarea;
