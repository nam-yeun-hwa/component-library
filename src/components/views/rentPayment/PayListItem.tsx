import { ReactNode } from "react";

interface PayListItemProps {
  children: ReactNode;
}

export default function PayListItem({ children }: PayListItemProps) {
  return (
    <div className=" shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-5 py-4 text-[#333333] font-medium flex justify-between items-center bg-white relative rounded-[10px]">
      <h4 className="text-sm font-bold text-[#333333] h-[16px]">
        서울 강남구 삼성로81길 22(한정빌딩) 4층 401호
      </h4>
      {children}
    </div>
  );
}
