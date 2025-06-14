import { useRouter } from "next/navigation";

const useHomeExploreService = () => {
  const router = useRouter();

  const handleClickInstallment = () => {
    router.push("/explore-service/installment");
  };

  const handleClickAnnual = () => {
    router.push("/explore-service/annual");
  };

  const handleClickCharge = () => {
    router.push("/explore-service/charge");
  };

  const handleClickPartner = () => {
    router.push("/explore-service/partner");
  };

  const handleClickRefund = () => {
    router.push("/explore-service/refund");
  };

  return {
    handleClickInstallment,
    handleClickAnnual,
    handleClickCharge,
    handleClickPartner,
    handleClickRefund,
  };
};

export default useHomeExploreService;
