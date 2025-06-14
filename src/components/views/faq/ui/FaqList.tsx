import { Faq } from "@/api/faq/types";
import { FaqItem } from "./FaqItem";

interface FaqListProps {
  faqs: Faq[];
}

export function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="">
      {faqs.map((faq: Faq) => (
        <FaqItem key={faq.idx} faq={faq} />
      ))}
    </div>
  );
}
