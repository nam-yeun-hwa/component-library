import { UseFormRegisterReturn } from "react-hook-form";

/**
 * 선택 드롭다운의 옵션을 나타냅니다.
 * @interface Option
 * @property {string} label - 옵션의 표시 텍스트.
 * @property {string | number} value - 옵션과 연결된 값.
 */
interface Option {
  label: string;
  value: string | number;
}

/**
 * FormSelect 컴포넌트의 속성.
 * @interface FormSelectProps
 * @property {string} name - 폼 제출에 사용되는 선택 필드의 이름.
 * @property {Option[]} options - 선택 드롭다운에 표시할 옵션 배열.
 * @property {UseFormRegisterReturn} register - react-hook-form에서 선택 필드를 바인딩하기 위한 register 객체.
 * @property {string} [error] - 유효성 검사 실패 시 표시할 선택적 에러 메시지.
 */
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: string;
}

/**
 * react-hook-form과 통합된 재사용 가능한 선택 입력 컴포넌트.
 * 제공된 옵션으로 드롭다운을 렌더링하고, 유효성 검사 에러가 있을 경우 표시합니다.
 *
 * @param {FormSelectProps} props - FormSelect 컴포넌트의 속성.
 * @param {string} props.name - 선택 필드의 이름.
 * @param {Option[]} props.options - 드롭다운에 표시할 옵션 목록.
 * @param {UseFormRegisterReturn} props.register - react-hook-form의 register 객체.
 * @param {string} [props.error] - 선택 필드 아래에 표시할 에러 메시지.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} [props.rest] - select 요소에 추가할 HTML 속성.
 * @returns {JSX.Element} 렌더링된 선택 입력 컴포넌트.
 *
 * @example
 * ```jsx
 * import { useForm } from "react-hook-form";
 * import FormSelect from "./FormSelect";
 *
 * const options = [
 *   { label: "옵션 1", value: "1" },
 *   { label: "옵션 2", value: "2" },
 * ];
 *
 * const MyForm = () => {
 *   const { register, formState: { errors } } = useForm();
 *
 *   return (
 *     <FormSelect
 *       name="mySelect"
 *       options={options}
 *       register={register("mySelect", { required: "이 필드는 필수입니다" })}
 *       error={errors.mySelect?.message}
 *     />
 *   );
 * };
 * ```
 */
const FormSelect: React.FC<FormSelectProps> = ({ name, options, register, error, ...rest }) => {
  return (
    <div className="mb-4">
      <select
        id={name}
        {...register}
        {...rest}
        className={`block w-full py-2 border-b-[1px] text-sm focus:outline-none
          ${error ? "border-red-500" : "border-gray-300"}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;

// import { UseFormRegisterReturn } from "react-hook-form";

// interface Option {
//   label: string;
//   value: string | number;
// }

// interface FormSelectProps
//   extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   name: string;
//   options: Option[];
//   register: UseFormRegisterReturn;
//   error?: string;
// }

// const FormSelect: React.FC<FormSelectProps> = ({
//   name,
//   options,
//   register,
//   error,
//   ...rest
// }) => {
//   return (
//     <div className="mb-4">
//       <select
//         id={name}
//         {...register}
//         {...rest}
//         className={`block w-full py-2 border-b-[1px] text-sm focus:outline-none
//           ${error ? "border-red-500" : "border-gray-300"}`}
//       >
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default FormSelect;
