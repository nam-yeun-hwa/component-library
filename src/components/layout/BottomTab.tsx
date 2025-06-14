"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { TabItem } from "@/data/commom";
// import { useAuthStore } from "@/store/authStore";

interface BottomTabProps {
  tabs: TabItem[];
}

export default function BottomTab({ tabs }: BottomTabProps) {
  const pathname = usePathname();
  const router = useRouter();
  // const [activePath, setActivePath] = useState("/");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[600px] mx-auto">
      <div className="">
        <div className="flex justify-around items-center h-[60px]">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center justify-center w-full h-full ${
                pathname === tab.path ? "text-[#0099ff]" : "text-[#999999]"
              }`}
            >
              <Image src={pathname === tab.path ? tab.iconOn : tab.icon} alt={tab.path} width={24} height={24} />
              <span className="text-xs mt-1">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
