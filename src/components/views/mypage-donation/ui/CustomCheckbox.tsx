// components/CustomCheckbox.tsx
import { UseFormRegister } from "react-hook-form";

interface Option {
  label?: string;
  value: string;
}

interface CustomCheckboxProps {
  option: Option;
  register: UseFormRegister<Record<string, unknown>>;
  name: string;
  isChecked: (value: string) => boolean;
  toggle: (option: Option) => void;
}

export default function CustomCheckbox({
  option,
  register,
  name,
  isChecked,
  toggle,
}: CustomCheckboxProps) {
  const checked = isChecked(option.value);

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        value={option.value}
        {...register(name)}
        checked={checked}
        onChange={() => toggle(option)}
        className="hidden peer"
      />
      <div>
        <img
          src={
            checked
              ? "/images/donation/icon_checkbox_main_active.svg"
              : "/images/donation/icon_checkbox_main.svg"
          }
          alt="체크박스"
          width={16}
          height={16}
        />
      </div>
      <span className="text-sm">{option.label}</span>
    </label>
  );
}
