import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

export interface RadioGroupProps {
  register: UseFormRegisterReturn;
  options: Option[];
  errors: FieldErrors;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  register,
}) => {
  return (
    <div className="flex justify-around">
      {options.map((opt) => (
        <label key={opt.value} className="text-[12px] flex items-center gap-1">
          <input type="radio" value={opt.value} {...register} />
          {opt.label}
        </label>
      ))}
    </div>
  );
};
