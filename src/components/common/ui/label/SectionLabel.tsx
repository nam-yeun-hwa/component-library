import Image from "next/image";

const SectionLabel = () => {
  return (
    <div>
      <Image
        src={"/images/rental_pay_icon.svg"}
        alt="rentalpay"
        width={23}
        height={23}
        className="inline-block align-middle"
      />
      <h2 className="text-section-h2 text-black font-semibold inline-block align-middle ml-[5px]">
        렌탈페이 선납결제
      </h2>
    </div>
  );
};

export default SectionLabel;
