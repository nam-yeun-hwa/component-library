interface ListItemProps {
  label: string;
  address: string;
}
/**
 * 라벨과 주소를 스타일링된 형식으로 표시하는 재사용 가능한 리스트 아이템 컴포넌트입니다.
 * @component
 * @param {ListItemProps} props - ListItem 컴포넌트의 props입니다.
 * @param {string} props.label - 표시할 라벨 텍스트 (예: "주소").
 * @param {string} props.address - 표시할 주소 텍스트 (예: "경기도 분당시 수내동").
 */
export default function ListItem({ label, address }: ListItemProps) {
  return (
    <li className="h-[17.5px] mb-2">
      <span className="text-sm font-bold text-input-dark w-[75px] inline-block">
        {label}
      </span>
      <span className="text-sm font-normal text-input-dark ">{address}</span>
    </li>
  );
}
