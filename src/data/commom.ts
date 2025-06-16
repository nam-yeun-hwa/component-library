/**
 * 버튼 탭 내비게이션 항목을 나타냅니다.
 * @interface TabItem
 * @property {string} name - 탭의 표시 이름 (한국어).
 * @property {string} path - 탭의 URL 경로.
 * @property {string} icon - 탭의 기본 아이콘 이미지 경로.
 * @property {string} iconOn - 탭이 활성화된 상태의 아이콘 이미지 경로.
 */

export interface TabItem {
  name: string;
  path: string;
  iconName: string;
  iconColor: string;
}
/**
 * 애플리케이션의 버튼 탭 내비게이션에 사용되는 탭 항목 배열입니다.
 * 각 탭은 이름, 경로, 기본 아이콘, 활성화 아이콘을 정의합니다.
 */
export const tabs: TabItem[] = [
  {
    name: "혜택",
    path: "/category1",
    iconName: "ic:round-home",
    iconColor: "#999999",
  },
  {
    name: "DM",
    path: "/category2",
    iconName: "ic:round-home",
    iconColor: "#999999",
  },
  {
    name: "홈",
    path: "/",
    iconName: "ic:round-home",
    iconColor: "#999999",
  },
  {
    name: "내정보",
    path: "/category3",
    iconName: "ic:round-home",
    iconColor: "#999999",
  },
  {
    name: "전체메뉴",
    path: "/category4",
    iconName: "ic:round-home",
    iconColor: "#999999",
  },
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
