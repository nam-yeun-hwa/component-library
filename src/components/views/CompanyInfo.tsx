const CompanyInfo = () => {
  return (
    <div className="space-y-4 mt-5">
      <div className="text-[12px] text-[#888]">
        <h4 className="text-[14px] text-[#777] mb-[5px] font-bold">회사정보</h4>
        <p>회사명 : (주)렌탈페이</p>
        <p>대표자명 : 김정해, 김일회</p>
        <p>사업자 등록번호 : 481 - 87 - 03696</p>
        <p>주소 : 서울 강남구 삼성로81길 22(한정빌딩) 4층 401호</p>
        <p>개인정보관리책임자 : 최상운</p>
      </div>
      <div className="text-[12px] text-[#888]">
        <h4 className="text-[14px] text-[#777] mb-[5px] font-bold">고객센터</h4>
        <p>전화 : 1533-1521</p>
        <p>(운영시간 : 09:00 ~ 24: 00 / 연중무휴)</p>
        <p>이메일 : support@rt-rentalpay.com</p>
      </div>
    </div>
  );
};

export default CompanyInfo;
