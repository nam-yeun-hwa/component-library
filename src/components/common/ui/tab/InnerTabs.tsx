import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Tab {
  id: string; // 탭의 고유 ID
  value: string; // 탭의 값 (선택 시 사용)
  label: string; // 탭에 표시될 텍스트
  title: string; // 선택 시 표시될 증빙서류 제목
  classnames?: string; // 개별 탭에 적용할 추가 클래스 (선택 사항)
}

interface MenuTabsProps {
  tabs: Tab[]; // 탭 배열
  register: UseFormRegisterReturn; // react-hook-form의 register 객체
  name: string; // 폼 필드의 이름
  classnames?: string; // 컨테이너에 적용할 추가 클래스 (선택 사항)
}

/**
 * 동적 탭 컴포넌트입니다.
 * React Hook Form과 함께 사용되며, 탭 선택 상태를 폼에 연동하고 애니메이션 바 및 증빙서류 제목을 관리합니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Tab[]} props.tabs - 탭 배열 (각 탭은 id, value, label, title, classnames 속성을 가짐)
 * @param {UseFormRegisterReturn} props.register - react-hook-form의 register 객체
 * @param {string} props.name - 폼 필드의 이름 (react-hook-form과 연동)
 * @param {string} [props.classnames] - 탭 컨테이너에 적용할 추가 CSS 클래스
 *
 * @returns {JSX.Element} 동적 탭 UI와 애니메이션 바를 포함한 컴포넌트
 */
const InnerTabs: React.FC<MenuTabsProps> = ({ tabs, register, classnames }) => {
  // 선택된 탭의 값을 상태로 관리 (초기값은 첫 번째 탭의 값 또는 빈 문자열)
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.value || "");

  // 증빙서류 제목을 업데이트
  useEffect(() => {
    const titleElement = document.getElementById("evidentiary_title");
    if (titleElement && tabs.length > 0) {
      const selected = tabs.find((tab) => tab.value === selectedTab);
      if (selected) {
        titleElement.innerText = selected.title;
      }
    }
  }, [selectedTab, tabs]);

  // 탭 클릭 시 호출되는 핸들러: 선택된 탭 값을 업데이트
  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  // 애니메이션 바의 위치와 너비를 계산
  const selectedIndex = tabs.findIndex((tab) => tab.value === selectedTab); // 선택된 탭의 인덱스
  const tabWidth = 100 / tabs.length; // 각 탭의 너비 비율 (%)
  const animationLeft = `calc(${selectedIndex * tabWidth}% + 5px)`; // 애니메이션 바의 왼쪽 위치
  const animationWidth = `calc(${tabWidth}% - 10px)`; // 애니메이션 바의 너비

  return (
    // 탭 컨테이너: 회색 배경, 둥근 모서리, flex 레이아웃
    <div
      className={classNames(
        "relative flex h-10 items-center bg-gray-200 rounded-md p-1 mb-5",
        classnames
      )}
    >
      {/* 탭 목록을 동적으로 렌더링 */}
      {tabs.map((tab) => (
        // 각 탭: 클릭 시 선택 상태 변경, 호버 효과 포함
        <label
          key={tab.id}
          className={classNames(
            "flex items-center justify-center flex-1 p-2 cursor-pointer rounded-md transition-all duration-200 z-10",
            tab.classnames
          )}
          onClick={() => handleTabClick(tab.value)}
        >
          {/* 라디오 버튼: UI에는 숨김, 폼 호환성을 위해 유지 */}
          <input
            type="radio"
            id={tab.id}
            value={tab.value}
            checked={selectedTab === tab.value}
            className="hidden"
            {...register} // register에서 name과 onChange 제공
          />
          {/* 탭 레이블 텍스트 */}
          <span className="text-sm font-medium text-black">{tab.label}</span>
        </label>
      ))}

      {/* 애니메이션 바: 선택된 탭 아래에 표시 */}
      {tabs.length > 0 && (
        <div className="absolute top-[4px] left-0 w-full">
          {/* 애니메이션 바 요소: 부드러운 이동 애니메이션 적용 */}
          <div
            className="absolute z-0 h-8 bg-white rounded shadow-md transition-all duration-500 ease-in-out"
            style={{ left: animationLeft, width: animationWidth }}
          />
        </div>
      )}
    </div>
  );
};

export default InnerTabs;
