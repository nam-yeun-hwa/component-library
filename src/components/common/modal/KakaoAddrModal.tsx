/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(layoutCase)/address-search/page.tsx
"use client";
import { useUserContractStore } from "@/store/rent-payment/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useKakaoPostcode } from "@/hooks/kakao/useKakaoPostcode";
import ModalHeader from "@/components/layout/ModalHeader";
import { useKakaoAddrStore } from "@/store/common/useKakaoAddrStore";

declare global {
  interface Window {
    daum: any; // Kakao Postcode API가 window.daum에 추가됨
    Postcode: any; // Kakao Postcode API의 Postcode 클래스
  }
}
interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
}

const KakaoAddrModal = () => {
  const postcodeContainerRef = useRef<HTMLDivElement>(null);
  const postcodeInstanceRef = useRef<null | any>(null);
  const router = useRouter();
  const { setBaseAddress } = useUserContractStore();
  const { setModalViewToggle } = useKakaoAddrStore();
  const { isLoaded, error } = useKakaoPostcode();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // DOM 초기화
    if (postcodeContainerRef.current) {
      postcodeContainerRef.current.innerHTML = "";
      console.log("postcode-container 자식 초기화 완료");
    }
    const existingLayers = document.querySelectorAll(
      "div[id^='__daum__layer_']"
    );
    existingLayers.forEach((layer) => layer.remove());
    console.log("기존 __daum__layer_ 요소 제거 완료");

    if (error) {
      console.error("Kakao Postcode 로드 에러:", error.message);
      return;
    }

    const initializePostcode = () => {
      if (postcodeInstanceRef.current) {
        console.log("Postcode 인스턴스 이미 존재, 초기화 스킵");
        return;
      }

      if (
        !isLoaded ||
        !window.daum ||
        !window.daum.Postcode ||
        !postcodeContainerRef.current
      ) {
        console.log("Kakao Postcode API 미준비", {
          isLoaded,
          windowDaumExists: !!window.daum,
          windowDaumPostcodeExists: !!window.daum?.Postcode,
        });
        return;
      }

      postcodeInstanceRef.current = new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeData) => {
          const addr = data.roadAddress || data.jibunAddress;
          setBaseAddress(addr);
          setModalViewToggle(false);
        },
      }).embed(postcodeContainerRef.current, {
        q: "",
        autoClose: true,
      });
      console.log("Kakao Postcode 초기화 성공");
      const layers = document.querySelectorAll("div[id^='__daum__layer_']");
      console.log(`__daum__layer_1 요소 개수: ${layers.length}`);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      initializePostcode();
    } else {
      document.addEventListener("DOMContentLoaded", initializePostcode, {
        once: true,
      });
    }

    return () => {
      if (postcodeInstanceRef.current) {
        postcodeInstanceRef.current = null;
      }
      if (postcodeContainerRef.current) {
        postcodeContainerRef.current.innerHTML = "";
      }
      const layers = document.querySelectorAll("div[id^='__daum__layer_']");
      layers.forEach((layer) => layer.remove());
      document.removeEventListener("DOMContentLoaded", initializePostcode);
      console.log("Cleanup: postcode-container 및 __daum__layer_ 요소 초기화");
    };
  }, [isLoaded, error, router, setBaseAddress]);

  return (
    <div className="absolute left-0 top-0 w-full bg-white z-[60]">
      <ModalHeader />
      <div
        ref={postcodeContainerRef}
        id="postcode-container"
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
          marginBottom: "20px",
        }}
      ></div>
    </div>
  );
};

export default KakaoAddrModal;
