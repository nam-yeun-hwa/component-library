import { Icon } from "@iconify/react";

export interface TabItem {
  name: string;
  path: string;
  icon: string;
  iconOn: string;
}
/**
 * 버튼 탭 내비게이션 항목을 나타냅니다.
 * @interface TabItem
 * @property {string} name - 탭의 표시 이름 (한국어).
 * @property {string} path - 탭의 URL 경로.
 * @property {string} icon - 탭의 기본 아이콘 이미지 경로.
 * @property {string} iconOn - 탭이 활성화된 상태의 아이콘 이미지 경로.
 */

/**
 * 애플리케이션의 버튼 탭 내비게이션에 사용되는 탭 항목 배열입니다.
 * 각 탭은 이름, 경로, 기본 아이콘, 활성화 아이콘을 정의합니다.
 */
export const tabs: TabItem[] = [
  {
    name: "혜택",
    path: "/",
    icon: '<Icon icon="mdi:home" />',
    iconOn: "/images/nav_payment_on.svg",
  },
  // {
  //   name: "DM",
  //   path: "/category2",
  //   icon: "/images/nav_info.svg",
  //   iconOn: "/images/nav_info_on.svg",
  // },
  // {
  //   name: "홈",
  //   path: "/",
  //   icon: "/images/nav_home.svg",
  //   iconOn: "/images/nav_home_on.svg",
  // },
  // {
  //   name: "내정보",
  //   path: "/category4",
  //   icon: "/images/nav_cs.svg",
  //   iconOn: "/images/nav_cs_on.svg",
  // },
  // {
  //   name: "전체메뉴",
  //   path: "/category5",
  //   icon: "/images/nav_mypage.svg",
  //   iconOn: "/images/nav_mypage_on.svg",
  // },
];

/**
 * 내비게이션 라우트 설정을 나타냅니다.
 * @typedef {Object} routeNav
 * @property {string} name - 내비게이션 항목의 표시 이름 (한국어).
 * @property {string} path - 내비게이션 라우트의 URL 경로.
 */
export interface routeNav {
  name: string;
  path: string;
}

/**
 * 애플리케이션 헤더에 사용되는 내비게이션 라우트 배열입니다.
 * 각 라우트는 내비게이션을 위한 이름과 해당 경로를 정의합니다.
 */
export const allNavigationRoutes: routeNav[] = [
  {
    name: "문의하기",
    path: "/",
  },
];
