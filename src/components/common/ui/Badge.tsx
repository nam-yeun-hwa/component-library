/**
 * Badge 컴포넌트의 속성을 정의합니다.
 * @interface BadgeProps
 * @property {string} name - 배지에 표시할 텍스트.
 * @property {"Pending" | "Unpaid" | "Completed"} badgeType - 배지의 유형으로, 색상을 결정합니다.
 */
interface BadgeProps {
  badgeType: "Pending" | "Unpaid" | "Completed";
}

/**
 * 주어진 배지 유형에 따라 색상을 반환합니다.
 * @param {BadgeProps["badgeType"]} badgeType - 배지 유형 ("Pending", "Unpaid", "Completed").
 * @returns {string} 배지의 hex 색상 코드.
 */
const getBadgeColor = (badgeType) => {
  switch (badgeType) {
    case "Pending":
      return "#FFA600"; // Orange
    case "Completed":
      return "#008000"; // Green
    case "Unpaid":
      return "#EC4E39"; // Red
    default:
      return "#000000"; // Fallback
  }
};

const getBadgeName = (badgeType) => {
  switch (badgeType) {
    case "Pending":
      return "예정"; // Orange
    case "Completed":
      return "완료"; // Green
    case "Unpaid":
      return "미납"; // Red
    default:
      return "#000000"; // Fallback
  }
};

/**
 * 텍스트와 유형에 따라 색상이 지정된 스타일링된 배지를 표시하는 재사용 가능한 컴포넌트입니다.
 * @param {BadgeProps} props - 컴포넌트 속성.
 * @param {string} props.name - 배지에 표시할 텍스트.
 * @param {"Pending" | "Unpaid" | "Completed"} props.badgeType - 배지의 유형으로, 색상을 결정합니다.
 */
const Badge: React.FC<BadgeProps> = ({ badgeType }) => {
  return (
    <div
      className="pt-[5px] pb-[3px] px-[8px] mr-1.5 rounded-[10px] text-[11px] font-normal leading-none text-white "
      style={{ backgroundColor: getBadgeColor(badgeType) }}
    >
      {getBadgeName(badgeType)}
    </div>
  );
};

export default Badge;
