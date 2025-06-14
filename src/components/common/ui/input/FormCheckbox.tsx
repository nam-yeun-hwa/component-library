import classNames from "classnames";
import React, { Dispatch } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export interface FormCheckboxProps {
  register: UseFormRegisterReturn;
  name: string;
  errors: FieldErrors;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  setCheckChangeState: Dispatch<React.SetStateAction<boolean>>;
  checkChangeState: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  register,
  name,
  errors,
  disabled,
  className = "",
  style,
  setCheckChangeState,
  checkChangeState,
}) => {
  const disabledStyle = "disabled:opacity-50";
  const focusStyle = "focus:outline-none";

  return (
    <>
      <label className="relative w-[16px] h-[16px] cursor-pointer">
        <input
          type="checkbox"
          {...register}
          disabled={disabled}
          checked={checkChangeState}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setCheckChangeState(isChecked);
            register.onChange(e);
          }}
          className={classNames(
            `appearance-none w-[16px] h-[16px] border border-gray-400 rounded-sm checked:bg-main-blue checked:border-main-blue transition-colors cursor-pointer`,
            focusStyle,
            disabledStyle,
            { "border-status-error": errors[name] },
            className
          )}
          style={style}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          className={classNames(
            `absolute top-[7px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity`,
            {
              "opacity-100": checkChangeState,
              "opacity-0": !checkChangeState,
            }
          )}
        >
          <path d="M1 3.08333L3.47059 6L8 1" stroke="white" strokeWidth="1.5" />
        </svg>
      </label>
      {errors[name]?.message && (
        <div className="text-status-error text-caption-md mt-1 px-md">{errors[name].message as string}</div>
      )}
    </>
  );
};
