import Image from "next/image";

interface MyPageListItemProps {
  title: string;
  onClick: () => void;
}

export default function MypageListItem(props: MyPageListItemProps) {
  const { title, onClick } = props;
  return (
    <div
      className="flex justify-between items-center py-[15px] cursor-pointer"
      onClick={onClick}
    >
      <p className="text-[#333333] font-semibold">{title}</p>
      <Image
        src="/images/right-arrow.svg"
        alt="right-arrow"
        width={20}
        height={20}
      />
    </div>
  );
}
