"use client";

import { useState } from "react";

/**
 * 재사용 가능한 스위치(toggle) 버튼 컴포넌트입니다.
 *
 * @component
 *
 * @prop {boolean} [checked]
 * 외부에서 상태를 제어할 수 있는 값입니다.
 * 이 값이 주어지면 컴포넌트는 controlled component로 동작하며, 상태는 외부에서 관리해야 합니다.
 *
 * @prop {boolean} [defaultChecked=false]
 * 내부 상태를 사용하는 uncontrolled component일 때의 초기값입니다.
 * `checked`가 undefined인 경우에만 사용됩니다.
 *
 * @prop {(checked: boolean) => void} [onChange]
 * 스위치 상태가 변경될 때 호출되는 콜백 함수입니다.
 * 변경된 상태 값이 인자로 전달됩니다.
 *
 * @prop {boolean} [disabled=false]
 * true일 경우 스위치를 비활성화합니다.
 * 클릭할 수 없고, 시각적으로 흐리게 표시됩니다.
 *
 * @prop {string} [className]
 * Tailwind CSS나 기타 클래스명을 전달해 스타일을 확장하거나 덮어쓸 수 있습니다.
 *
 * @example
 * // Controlled 방식
 * <Switch checked={true} onChange={(v) => console.log(v)} />
 *
 * @example
 * // Uncontrolled 방식
 * <Switch defaultChecked={false} onChange={(v) => console.log(v)} />
 *
 * @example
 * // Disabled 상태
 * <Switch checked={true} disabled />
 */

export default function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = "",
  width = 48, // 기본 width: 48px (w-12)
  height = 24, // 기본 height: 24px (h-6)
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  // 내부 토글 버튼 크기 (정사각형, 높이보다 살짝 작게)
  const knobSize = height - 8;
  const knobTranslate = isChecked ? width - height : 0;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      style={{
        width,
        height,
        padding: 4,
      }}
      className={`
        flex items-center rounded-full duration-300 ease-in-out
        ${isChecked ? "bg-[#0099ff]" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <div
        className="bg-white rounded-full shadow-md transform duration-300 ease-in-out"
        style={{
          width: knobSize,
          height: knobSize,
          transform: `translateX(${knobTranslate}px)`,
        }}
      />
    </button>
  );
}
