"use client";

export default function DonationTaxInfoModalContent() {
  return (
    <>
      <div className="text-text-disabled text-[11px] ">
        <span className="flex gap-1 items-center">
          <img
            src="/images/money_bag_icon.svg"
            width={11}
            height={11}
            alt="돈주머니 아이콘"
          />
          기부금 세제 혜택 신청 방법
        </span>
        <div className="flex flex-col gap-5">
          <p>1.기부내역 메뉴에서 세제 혜택을 받고 싶은 기부 내역 선택</p>
          <p>2.[기부세제 혜택 받으러 가기] 버튼 클릭</p>
          <p>3.주민등록번호 등 필요 정보 입력</p>
          <p>4.입력 완료 후, 기부금 영수증 자동 신청 완료!</p>
          <p>
            ※ 영수증은 정산 완료 후 발급되며, 국세청 홈택스에 자동 반영됩니다.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <p>
            - 렌탈페이를 통한 기부금은{" "}
            <strong>매월 27일, 구로구청 및 사회복지공동모금회</strong>에
            기부금과 기부자 정보가 전달됩니다.
          </p>
          <p>
            - <u>각 기관의 정산 및 서류 확인 절차를 거쳐,</u> 기부금 영수증이
            발급됩니다.
          </p>
          <p>
            - 발급된 영수증은 <u>국세청 홈택스에 자동 반영</u>되며, 연말정산 및
            소득공제 시 활용하실 수 있습니다.
          </p>
          <p>
            - 단, 홈택스 반영 시점은 기관별 처리 일정에 따라{" "}
            <strong>1~2주의 시차</strong>가 발생할 수 있습니다.
          </p>
          <p>
            - 기부자 정보는 <strong>주민등록번호</strong> 또는{" "}
            <strong>사업자번호</strong>를 포함하여 사전에 정확히 입력되어야
            하며, <u>누락 시 영수증 발급이 불가할 수 있으니 유의해 주세요.</u>
          </p>
        </div>
      </div>
    </>
  );
}
