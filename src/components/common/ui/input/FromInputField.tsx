import { ReactNode } from "react";

interface FromInputFieldProps {
  labelChild: ReactNode;
  inputChild: ReactNode;
  iconChild?: ReactNode;
}

const FromInputField: React.FC<FromInputFieldProps> = ({
  labelChild,
  inputChild,
  iconChild,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex flex-row items-center">
          {labelChild} {iconChild}
        </div>
        <div className="w-1/2 flex justify-end">{inputChild}</div>
      </div>
    </>
  );
};

export default FromInputField;
