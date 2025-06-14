import { ReactNode } from "react";
import classNames from "classnames";
import ListItem from "./ListItem";
import Button from "@/components/common/ui/Button";

interface PayListItemProps {
  arrowChild: ReactNode;
  badgeChild: ReactNode;
  payMoney: string;
  isActive: boolean;
}

export default function PayHistoryItem({
  badgeChild,
  arrowChild,
  payMoney,
  isActive,
}: PayListItemProps) {
  return (
    <>
      <div
        className={classNames("w-full flex items-center relative ", {
          "border-b border-[#f7f7f7] pb-[10px]": isActive,
        })}
      >
        {badgeChild}
        <h4 className="relative">
          <span className="inline-flex items-center text-[15px] after:absolute after:content-[''] after:block after:w-[1px] after:h-[8px]  after:right-[-7px]  after:top-[6.5px] after:bg-[#c5c5c5]">
            2025-06
          </span>
        </h4>
        <span className="pl-3 text-[15px]">{payMoney}원</span>
        {arrowChild}
      </div>
      {isActive && (
        <>
          <div className="pb-[15px] pt-[5px]">
            <ul className="flex flex-col gap-2 ">
              <ListItem label="상세주소" address="A동" />
              <ListItem label="임대유형" address="월세후불" />
              <ListItem label="보증금" address="10,000원" />
              <ListItem label="납부일" address="1일" />
            </ul>
          </div>
          <div className="flex flex-row gap-2.5">
            <Button variant="outlineGray" size="small">
              결제하기
            </Button>
            <Button variant="primary" size="small">
              자동납부
            </Button>
          </div>
        </>
      )}
    </>
  );
}
