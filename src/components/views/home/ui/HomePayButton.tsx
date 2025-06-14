import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePayButton = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2">
      <button className="bg-main-blue px-[70px] py-[15px] shadow-md rounded-[50px] flex items-center justify-center text-white whitespace-nowrap" onClick={() => router.push("/rent-payment")}>
        <Image
          src="/images/dollar_icon.png"
          alt="달러 아이콘"
          width={23}
          height={23}
        />
        결제 및 계약 관리
      </button>
    </div>
  );
};

export default HomePayButton;
