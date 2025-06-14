import { ReactNode } from "react";
import Button from "@/components/common/ui/Button";

interface BankAccountFieldProps {
  inputFeild: ReactNode;
  SelectListBank: ReactNode;
}

const BankAccountField: React.FC<BankAccountFieldProps> = ({ inputFeild, SelectListBank }) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div>{inputFeild}</div>
      <div className="flex flex-row justify-end">
        <div className="flex flex-row w-1/2 gap-2">
          {SelectListBank}
          <div className="w-1/2">
            <Button variant="outlinePrimary">계좌확인</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end h-[18px]">
        <p className="text-caption-default text-caption-gray">
          계좌확인은 <span className="text-main-blue">[필수]</span> 사항입니다.
        </p>
      </div>
    </div>
  );
};

export default BankAccountField;
