import classNames from "classnames";
import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  require?: boolean;
  classnames?: string;
}
/**
 * input 컴포넌트와 사용되는 label 컴포넌트 입니다.
 * @param require true값일 경우 필수라는 글자가 나옵니다.
 */
const InputLabel: React.FC<LabelProps> = ({ classnames, children, require }) => {
  return (
    <label className={classNames("inline-block mb-[10px]", classnames)}>
      <strong className="relative text-input-dark font-semibold text-base">{children}</strong>
      {require && <span className="relative ml-1 font-semi text-xs text-main-blue">[필수]</span>}
    </label>
  );
};

export default InputLabel;
