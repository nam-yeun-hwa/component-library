import Link from "next/link";
import { Faq } from "@/api/faq/types";

interface FaqItemProps {
  faq: Faq;
}

export function FaqItem({ faq }: FaqItemProps) {
  return (
    <Link href={`/cs/faq/${faq.idx}`} className="border-b-2 border-[#fbfbfb] h-[58px] flex items-center justify-between">
      <div className="flex items-center">
        <img src="/images/Q.svg" alt="Question" className="w-6 h-6 mr-2" />
        <h2 className="text-sm flex-grow text-[#333333]">{faq.title}</h2>
      </div>
      <img src="/images/right_arrow.svg" alt="Arrow" className="w-5 h-5 ml-2" />
    </Link>
  );
}
