import classNames from "classnames";
import Image from "next/image";

interface CardSelectBoxProps {
  classnames?: string;
  children: React.ReactNode;
}

const CardSelectBox: React.FC<CardSelectBoxProps> = ({ classnames, children }) => {
  return (
    <div className={classNames(classnames)}>
      <div className="top flex items-center relative">
        <Image
          src={"/images/card_color.svg"}
          alt="카드"
          className="mr-2"
          width={25} // SVG 크기에 맞는 값 설정 (필수)
          height={25} // SVG 크기에 맞는 값 설정 (필수)
        />
        <p className="text-base">분납 결제를 신청할 수 있어요.</p>
        <div className="absolute right-[14px]">{children}</div>
      </div>
    </div>
  );
};

export default CardSelectBox;
