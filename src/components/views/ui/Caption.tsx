import classNames from "classnames";
import { ReactNode } from "react";

interface CaptionProps {
  text: ReactNode;
  icon?: "icon_info_hover.svg";
  classnames?: string;
}

const beforeStyle =
  "before:content-[''] before:block before:absolute before:top-[2.5px] before:left-0 before:mr-[4px] pl-[18px] before:w-[13px] before:h-[13px] flex items-center  before:bg-no-repeat before:bg-cover";

const Caption = ({ text, icon, classnames }: CaptionProps) => {
  // iconPath를 기반으로 Tailwind 클래스 매핑
  const iconClassMap: { [key: string]: string } = {
    "icon_info_hover.svg": 'before:bg-[url("/images/icon_info_hover.svg")]',
  };

  return (
    <div
      className={classNames(
        "relative text-3 text-caption-gray text-caption-default",
        icon && iconClassMap[icon],
        icon && beforeStyle,
        classnames // iconPath가 있을 때만 클래스 추가
      )}
    >
      {text}
    </div>
  );
};

export default Caption;
