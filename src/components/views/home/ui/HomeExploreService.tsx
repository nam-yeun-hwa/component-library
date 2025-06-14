import Image from "next/image";
import useHomeExploreService from "../hooks/useHomeExploreService";

const HomeExploreService = () => {
  const {
    handleClickInstallment,
    handleClickAnnual,
    handleClickCharge,
    handleClickPartner,
    handleClickRefund,
  } = useHomeExploreService();

  return (
    <div className="">
      <h3 className="font-bold mb-[10px]">서비스 알아보기</h3>
      <div className="grid grid-cols-2 gap-3">
        <div
          className="bg-white rounded-[10px] p-3 relative h-[90px] cursor-pointer mb-[10px]"
          onClick={handleClickInstallment}
        >
          <h4 className="text-gray-dark-600 font-bold">무이자 할부 가능</h4>
          <p className="text-[11px] text-gray-dark-300">최장 7개월</p>
          <Image
            src="/images/sub_banner01.svg"
            alt="sub_banner01"
            width={92}
            height={50}
            className="absolute right-0 bottom-0"
          />
        </div>
        <div
          className="bg-white rounded-[10px] p-3 relative h-[90px] cursor-pointer"
          onClick={handleClickAnnual}
        >
          <Image
            src="/images/red_icon.svg"
            alt="sub_banner01"
            width={131}
            height={29}
            className="absolute left-0 top-[-16px] animate-bounce"
          />
          <h4 className="text-gray-dark-600 font-bold">연세 일괄 결제</h4>
          <p className="text-[11px] text-gray-dark-300">
            일년치 월세를
            <br />
            한번에
          </p>
          <Image
            src="/images/sub_banner02.svg"
            alt="sub_banner01"
            width={75}
            height={55}
            className="absolute right-1 bottom-0"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div
          className="bg-white rounded-[10px] p-3 relative h-[90px] cursor-pointer"
          onClick={handleClickCharge}
        >
          <h5 className="text-gray-dark-600 font-bold text-[14px]">
            수수료 2.7%
          </h5>
          <p className="text-[11px] text-gray-dark-300">
            업계최저
            <br />
            수수료
          </p>
          <Image
            src="/images/sub_banner07.svg"
            alt="sub_banner07"
            width={29}
            height={37}
            className="absolute right-[10px] bottom-[10px]"
          />
        </div>
        <div
          className="bg-white rounded-[10px] p-3 relative h-[90px] cursor-pointer"
          onClick={handleClickRefund}
        >
          <h5 className="text-gray-dark-600 font-bold text-[14px]">
            월세 환급
          </h5>
          <p className="text-[11px] text-gray-dark-300">
            이체내역
            <br />
            발급
          </p>
          <Image
            src="/images/sub_banner06.svg"
            alt="sub_banner06"
            width={29}
            height={37}
            className="absolute right-[10px] bottom-[10px]"
          />
        </div>
        <div
          className="bg-white rounded-[10px] p-3 relative h-[90px] cursor-pointer"
          onClick={handleClickPartner}
        >
          <h5 className="text-gray-dark-600 font-bold text-[14px]">
            공식 파트너
          </h5>
          <p className="text-[11px] text-gray-dark-300">
            공인중개사
            <br />
            가맹점
          </p>
          <Image
            src="/images/sub_banner05.svg"
            alt="sub_banner05"
            width={65}
            height={54}
            className="absolute right-0 bottom-0"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeExploreService;
