import { Dispatch, SetStateAction } from "react";

interface ArrowBtnProps {
  isActive: boolean; //버튼의 활성화 상태를 결정
  setIsActive: Dispatch<SetStateAction<boolean>>; //버튼의 활성화 상태를 설정
}

/**
 * 회전하는 화살표 버튼 컴포넌트
 *
 * 이 컴포넌트는 클릭 시 화살표가 회전하는 버튼을 렌더링합니다. 주로 드롭다운 메뉴, 아코디언, 또는 토글 UI에서 사용됩니다.
 * - `isActive` prop이 `true`일 경우 버튼이 180도 회전하여 활성화 상태를 나타냅니다.
 * - 클릭 시 `onClick` 콜백 함수가 실행됩니다.
 * - Tailwind CSS를 사용한 부드러운 회전 애니메이션(300ms)이 적용됩니다.
 * **/
const ArrowBtn: React.FC<ArrowBtnProps> = ({ isActive, setIsActive }) => {
  return (
    <button
      className={`absolute right-0 w-[40px] h-[40px] transition-transform duration-300 rotate-0 flex justify-center items-center ${
        isActive && "rotate-180"
      }`}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5.88086L8 -0.000156403L2.39916e-08 -0.000156403L4 5.88086Z" fill="#999999"></path>
      </svg>
    </button>
  );
};

export default ArrowBtn;
