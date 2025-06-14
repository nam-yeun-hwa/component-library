import React from "react";
import classNames from "classnames";

/**
 * Speech bubble 형태의 툴팁 컴포넌트입니다.
 * Tailwind CSS를 사용하여 스타일링되며, 텍스트, 정렬 상태, 스타일 타입, 꼬리 위치를 props로 받아 표시합니다.
 * speechBubble 타입은 지정된 위치에 삼각형(speech bubble 꼬리)을 포함합니다.
 * @component
 * @example
 * <Tooltip text="툴팁 내용" align="center" type="speechBubble" tailPosition="bottom" />
 */
interface TooltipProps {
  /** 툴팁에 표시할 텍스트 */
  text: string;
  /** 툴팁의 정렬 방식 ('left', 'right', 'center') */
  align?: "left" | "right" | "center";
  /** 툴팁의 스타일 타입 ('speechBubble', 'normal') */
  type?: "speechBubble" | "normal";
  /** 말풍선 꼬리의 위치 ('top', 'left', 'right', 'bottom') */
  tailPosition?: "top" | "left" | "right" | "bottom";
}

/**
 * @param props - 툴팁 컴포넌트의 props
 * @param props.text - 툴팁에 표시할 텍스트
 * @param props.align - 툴팁의 컨테이너 내 정렬 방식 ('left', 'right', 'center', 기본값: 'center')
 * @param props.type - 툴팁의 스타일 타입 ('speechBubble': 보더, 둥근 모서리, 삼각형 포함, 'normal': 보더 없음, 직각 모서리, 삼각형 없음, 기본값: 'speechBubble')
 * @param props.tailPosition - 말풍선 꼬리의 위치 ('top', 'left', 'right', 'bottom', 기본값: 'bottom')
 * @returns Speech bubble 또는 직사각형 스타일의 툴팁 요소
 */
const Tooltip: React.FC<TooltipProps> = ({
  text,
  align = "center",
  type = "speechBubble",
  tailPosition = "bottom",
}) => {
  const alignStyles = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  const typeStyles = {
    speechBubble: "rounded border border-main-blue",
    normal: "rounded-none",
  };

  const tailStyles = {
    top: {
      position:
        "absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-4 border-l-transparent border-r-transparent border-b-main-blue",
      offset: "top-[22px]", // 툴팁을 아래로 이동
    },
    bottom: {
      position:
        "absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-main-blue",
      offset: "-top-[22px]", // 원래 위치
    },
    left: {
      position:
        "absolute left-[calc(100%-1px)] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-4 border-r-[8px] border-t-transparent border-b-transparent border-r-main-blue",
      offset: "left-[22px]", // 툴팁을 오른쪽으로 이동
    },
    right: {
      position:
        "absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-4 border-l-[8px] border-t-transparent border-b-transparent border-l-main-blue",
      offset: "right-[22px]", // 툴팁을 왼쪽으로 이동
    },
  };

  return (
    <div
      className={classNames(
        "block absolute z-[1] px-[8px] py-[5px] text-white text-xs bg-main-blue",
        alignStyles[align],
        typeStyles[type],
        type === "speechBubble" && tailStyles[tailPosition].offset
      )}
    >
      {text}
      {type === "speechBubble" && <div className={classNames(tailStyles[tailPosition].position)} />}
    </div>
  );
};

export default Tooltip;
