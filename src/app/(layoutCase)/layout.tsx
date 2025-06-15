"use client";

import { ReactNode } from "react";
import BottomTab from "@/components/layout/BottomTab";
import HomeHeader from "@/components/layout/HomeHeader";
import PageHeader from "@/components/layout/PageHeader";
import { usePathname } from "next/navigation";
import HeaderModal from "@/components/layout/HeaderModal";
// import { navigationRoutes, tabs } from "@/data/layout";
// import { useKakaoPostcode } from "@/hooks/kakao/useKakaoPostcode";
// import { useModalStore } from "@/store/common/useModalStore";
// import Slider from "@/components/common/ui/gallery/Slider";
// import classNames from "classnames";
import { allNavigationRoutes, routeNav, tabs } from "@/data/commom";
// import { useModalStore } from "@/store/common/useModalStore";
// import { useModalStore } from "@/store/useModalStore";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  // const { isLoaded, error } = useKakaoPostcode();
  // const { isOpen, type, data, closeModal } = useModalStore();

  const pathname = usePathname();
  const modalActive = ["/terms/privacy"].some((path) => pathname === path);

  // useEffect(() => {
  //   if (isLoaded) {
  //     console.log("Kakao Postcode API 준비 완료");
  //   }
  //   if (error) {
  //     console.log("Kakao Postcode API 에러:", error.message);
  //   }
  // }, [isLoaded, error]);

  const headerName = () => {
    const pageName = allNavigationRoutes.find((tab: routeNav) => tab.path === pathname)?.name;
    if (pageName) {
      return pageName;
    } else if (pathname.startsWith("/cs")) {
      return "고객센터";
    }
    return "전체 메뉴";
  };

  return (
    <>
      {/* ============================= */}
      {/* ======= 모달 공통 사용 : s ===== */}
      {/* ============================= */}
      {/* <>{isOpen && <MultiModal modalType={type} onClose={closeModal} data={data} />}</> */}
      {/* ============================= */}
      {/* ======= 헤더 공통 사용 : s ======*/}
      {/* ============================= */}
      <div
        className="relative max-w-[600px] w-full min-h-screen mx-auto bg-white flex
	flex-col"
      >
        <>
          {pathname === "/" ? (
            <HomeHeader />
          ) : modalActive ? (
            <HeaderModal />
          ) : (
            <PageHeader locatedTitle={headerName()} />
          )}
        </>

        {children}
        {!pathname.includes("terms") &&
          !pathname.includes("sign-up") &&
          !pathname.includes("menu") &&
          !/^\/cs\/faq\/\d+$/.test(pathname) && <BottomTab tabs={tabs} />}
        {/* ============================= */}
        {/* ====== 헤더 공통 사용 : e ====== */}
        {/* ============================= */}
      </div>
    </>
  );
}

//  const { isOpen, type, data, closeModal } = useModalStore();

//  이미지 모달 열기 */}
//           {/* <button
//           onClick={() =>
//             openModal("image", {
//               imageUrl: "https://i.pinimg.com/736x/94/4b/17/944b17fdaef9aaa8a0713a3ce5ad11ba.jpg",
//               title: "이미지 모달",
//               desc: "이미지 모달 설명입니다.",
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           이미지 모달 열기
//         </button> */}
//           {/* 확인모달 열기 */}
//           {/* <button
//           onClick={() =>
//             openModal("confirm", {
//               title: "확인 모달",
//               desc: "이 작업을 진행하시겠습니까?",
//               confirmText: "확인",
//               onConfirm: () => {
//                 console.log("확인");
//               },
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           확인 모달 열기
//         </button> */}
//           {/* 예/아니오 모달 열기 */}
//           {/* <button
//           onClick={() =>
//             openModal("yesNo", {
//               title: "예/아니오 모달",
//               desc: "계속 진행하시겠습니까?",
//               yesText: "예",
//               noText: "아니오",
//               onYes: () => console.log("예 선택"),
//               onNo: () => console.log("아니오 선택"),
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           예/아니오 모달 열기
//         </button>
