import { useState } from "react";

interface UsePersonalInfoAgreementReturn {
  selected: string | null;
  getCheckboxIcon: (checked: boolean) => string;
  openTermModal: (termId: string) => void;
  closeTermModal: () => void;
}

export default function usePersonalInfoAgreement(): UsePersonalInfoAgreementReturn {
  const [selected, setSelected] = useState<string | null>(null);
  const getCheckboxIcon = (checked: boolean) =>
    checked ? "/images/checkbox2_on.svg" : "/images/checkbox2.svg";

  const openTermModal = (termId: string) => {
    console.log(termId);
    setSelected(termId);
  };

  const closeTermModal = () => {
    setSelected(null);
  };

  return {
    selected,
    getCheckboxIcon,
    openTermModal,
    closeTermModal,
  };
}
