import Image from "next/image";

interface MyPagePayDetailTabsProps {
  tabName: string;
}

const MyPagePayDetailTabs = ({ tabName }: MyPagePayDetailTabsProps) => {
  return (
    <button className="bg-[#F8F9FB] flex items-center px-[30px] py-2 gap-[5px] rounded-t-[10px] text-black text-base font-medium">
      <Image src="/images/home.svg" alt="샘플 이미지" width={25} height={25} />
      {tabName}
    </button>
  );
};
export default MyPagePayDetailTabs;
