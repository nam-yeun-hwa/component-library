import { SelectType } from "@/app/(layoutCase)/rent-payment/add-base/data";
import { ChangeEvent, Dispatch } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

/**
 * SelectListBox 컴포넌트의 속성.
 * @interface SelectListBoxProps
 * @property {string} select - 현재 선택된 값.
 * @property {Dispatch<React.SetStateAction<string>>} setSelected - 선택된 값을 업데이트하는 상태 설정 함수.
 * @property {SelectType[]} options - 선택 드롭다운에 표시할 옵션 배열.
 * @property {UseFormRegisterReturn} register - react-hook-form에서 선택 필드를 바인딩하기 위한 register 객체.
 * @property {boolean} [disabled=false] - 선택 요소를 비활성화할지 여부.
 */
interface SelectListBoxProps {
  select: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
  options: SelectType[];
  register: UseFormRegisterReturn;
  disabled?: boolean;
}

/**
 * 기본, 비활성화, 포커스 스타일을 결합한 CSS 클래스 문자열.
 * @constant {string}
 */
const baseStyles =
  "block w-full h-[50px] px-4 border border-input-gray rounded-md font-medium text-base bg-input-gray box-border cursor-pointer text-input-dark";
const disabledStyles = "disabled:text-black disabled:border-none disabled:bg-[#f1f1f1]";
const focusStyles = "focus:outline-none focus:border-[#007bff]";
const selectStyles = [baseStyles, disabledStyles, focusStyles].join(" ");

/**
 * react-hook-form과 통합된 재사용 가능한 선택 드롭다운 컴포넌트.
 * 제공된 옵션으로 드롭다운을 렌더링하고, 선택 변경 시 상태를 업데이트합니다.
 *
 * @param {SelectListBoxProps} props - SelectListBox 컴포넌트의 속성.
 * @param {string} props.select - 현재 선택된 값.
 * @param {Dispatch<React.SetStateAction<string>>} props.setSelected - 선택된 값을 업데이트하는 함수.
 * @param {SelectType[]} props.options - 드롭다운에 표시할 옵션 목록.
 * @param {UseFormRegisterReturn} props.register - react-hook-form의 register 객체.
 * @param {boolean} [props.disabled=false] - 선택 요소의 비활성화 여부.
 *
 * @example
 * ```jsx
 * import { useForm } from "react-hook-form";
 * import { useState } from "react";
 * import SelectListBox from "./SelectListBox";
 *
 * const options = [
 *   { name: "옵션 1", value: "1" },
 *   { name: "옵션 2", value: "2" },
 * ];
 *
 * const MyForm = () => {
 *   const { register } = useForm();
 *   const [selected, setSelected] = useState("");
 *
 *   return (
 *     <SelectListBox
 *       select={selected}
 *       setSelected={setSelected}
 *       options={options}
 *       register={register("mySelect")}
 *       disabled={false}
 *     />
 *   );
 * };
 * ```
 */
const SelectListBox: React.FC<SelectListBoxProps> = ({ select, setSelected, options, register, disabled = false }) => {
  /**
   * 선택 값 변경 시 호출되는 핸들러.
   * 선택된 옵션을 찾아 상태를 업데이트합니다.
   * @param {ChangeEvent<HTMLSelectElement>} event - 선택 변경 이벤트.
   */
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = options.find((b) => b.value === event.target.value);
    if (select) {
      console.log(select);
      setSelected(select.value);
      // console.log(`Bank: ${bank.name}, Code: ${bank.value}`);
    }
  };

  return (
    <div className="relative">
      <select
        className={selectStyles}
        disabled={disabled}
        {...register}
        value={select ? select : "select"}
        onChange={handleChange}
      >
        <option value="" disabled className="absolute right-10">
          선택하세요
        </option>
        {options.map((o) => (
          <option key={o.name} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectListBox;
