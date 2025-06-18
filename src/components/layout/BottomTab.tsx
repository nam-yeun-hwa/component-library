// "use client";

import { usePathname, useRouter } from "next/navigation";
import { TabItem } from "@/data/commom";
import Image from "next/image";

interface BottomTabProps {
  tabs: TabItem[];
}

export default function BottomTab({ tabs }: BottomTabProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[600px] mx-auto">
      <div className="flex justify-around items-center h-[60px]">
        {tabs.map((tab) => (
          <button className="flex flex-col items-center" key={tab.name} onClick={() => router.push(tab.path)}>
            {pathname === tab.path ? (
              <Image src="/icons/mdi-home-active.svg" alt="Home Icon" width={30} height={30} priority />
            ) : (
              <Image src="/icons/mdi-home.svg" alt="Home Icon" width={30} height={30} priority />
            )}
            <span className="text-xs mt-[0px]">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
