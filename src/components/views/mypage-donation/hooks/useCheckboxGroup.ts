import { useState } from "react";

interface Option {
  label?: string;
  value: string;
}

interface UseCheckGroupReturn {
  selected: Option[];
  isChecked: (value: string) => boolean;
  toggle: (option: Option) => void;
  name: string;
}

export const useCheckboxGroup = (name: string): UseCheckGroupReturn => {
  const [selected, setSelected] = useState<Option[]>([]);
  const isChecked = (value: string) =>
    selected.some((item) => item.value === value);

  const toggle = (option: Option) => {
    setSelected((prev) => {
      const exists = prev.find((item) => item.value === option.value);
      if (exists) {
        return prev.filter((item) => item.value !== option.value);
      } else {
        return [...prev, option];
      }
    });
  };

  return {
    selected,
    isChecked,
    toggle,
    name,
  };
};
