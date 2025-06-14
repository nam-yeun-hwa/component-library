import { FaqCategory } from "@/api/faq/types";

interface FaqTabsProps {
  activeTab: FaqCategory;
  onTabClick: (category: FaqCategory) => void;
}

const FaqTabs = ({ activeTab, onTabClick }: FaqTabsProps) => {
  const tabs: { key: FaqCategory; label: string }[] = [
    { key: "1", label: "이용 문의" },
    { key: "2", label: "입금 문의" },
    { key: "3", label: "결제 문의" },
  ];

  return (
    <div className="my-5 flex">
      {tabs.map((tab, index) => (
        <button
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`flex-1 h-[35px] text-sm text-center transition-colors duration-200 border text-[#999999] ${
            activeTab === tab.key ? "text-blue-400 border-blue-400" : index > 0 && " border-gray-200 border-l-0"
          } `}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FaqTabs;
