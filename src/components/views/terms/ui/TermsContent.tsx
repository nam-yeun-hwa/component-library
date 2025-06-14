import React from "react";
import TermContent from "./TermContent";
import PrivacyContent from "./PrivacyContent";
import EtcContent from "./EtcContent";

interface TermsContentProps {
  termId: string;
  onClick: () => void;
}

export default function TermsContent({ termId, onClick }: TermsContentProps) {
  const renderContent = () => {
    switch (termId) {
      case "terms":
        return <TermContent onClick={onClick} />;
      case "privacy":
        return <PrivacyContent onClick={onClick} />;
      case "etc":
        return <EtcContent onClick={onClick} />;
      default:
        return;
    }
  };

  return renderContent();
}
