import React from "react";
import PersonalInfoUseContent from "./PersonalInfoUseContent";
import PersonalInfoThirdPartyContent from "./PersonalInfoThirdPartyContent";

interface PersonalInfoContentProps {
  termId: string;
  onClick: () => void;
}

export default function PersonalInfoContent({
  termId,
  onClick,
}: PersonalInfoContentProps) {
  const renderContent = () => {
    switch (termId) {
      case "personalInfoUse":
        return <PersonalInfoUseContent onClick={onClick} />;
      case "personalInfoThirdParty":
        return <PersonalInfoThirdPartyContent onClick={onClick} />;
      default:
        return;
    }
  };

  return renderContent();
}
