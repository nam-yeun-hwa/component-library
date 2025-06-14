import { useRouter } from "next/navigation";

const useHomeBottomInfo = () => {
  const router = useRouter();

  const handleClickInfo = () => {
    router.push("/info");
  };

  const handleClickRefundGuide = () => {
    router.push("/explore-service/refund-guide");
  };

  return {
    handleClickInfo,
    handleClickRefundGuide,
  };
};

export default useHomeBottomInfo;
