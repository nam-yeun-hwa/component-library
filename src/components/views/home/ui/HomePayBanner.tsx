import Image from "next/image";
import useHomePayBanner from "../hooks/useHomePayBanner";

const HomePayBanner = () => {
  const { handleClickPay } = useHomePayBanner();
  return (
    <button
      type="button"
      className="w-full mt-6 rounded-[10px] px-6 py-5 relative text-left"
      style={{
        backgroundImage: "linear-gradient(to left, #0099ff, #b266ff)",
      }}
      onClick={handleClickPay}
    >
      <h3 className="text-[17px] text-white font-semibold flex items-center gap-2">
        연세살이 · 보증금 · 월세선납
        <Image
          src="/images/arrow_w6.svg"
          alt="arrow_w6"
          width={11}
          height={8.5}
          className="animate-bounceRight"
        />
      </h3>
      <p className="text-[13px] text-white opacity-70">
        지금 바로 결제 진행하세요
      </p>
      <Image
        src="/images/recipt_icon2.svg"
        alt="recipt_icon2"
        width={65}
        height={54}
        className="absolute right-[20px] bottom-[10px]"
      />
    </button>
  );
};

export default HomePayBanner;
