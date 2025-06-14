import { useRouter } from "next/navigation";

const useHomePayBanner = () => {
  const router = useRouter();

  const handleClickPay = () => {
    router.push("/pay");
  };

  return {
    handleClickPay,
  };
};

export default useHomePayBanner;
