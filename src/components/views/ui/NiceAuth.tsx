/* eslint-disable @typescript-eslint/no-explicit-any */
// components/NiceAuth.tsx
import React, { useState } from "react";
import axios from "axios";
import { NiceAuthProps } from "@/types/nice";

const NiceAuth: React.FC<NiceAuthProps> = ({ onAuthSuccess, onAuthError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // 1. access token 발급
      const { data: tokenRes } = await axios.post("/api/nice/token");
      const accessToken = tokenRes.data.dataBody.access_token;

      // 2. 암호화 토큰 발급
      const { data: cryptoRes } = await axios.post("/api/nice/crypto-token", {
        token: accessToken,
      });

      // 3. 인증 팝업 호출 (모듈 방식)
      const authUrl = `https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb`;
      const form = document.createElement("form");
      form.method = "POST";
      form.action = authUrl;
      form.target = "nice_auth_popup";

      const params: Record<string, string> = {
        m: "checkplusService",
        token_version_id: cryptoRes.data.token_version_id,
        sitecode: cryptoRes.data.site_code,
        enc_data: cryptoRes.authData.encData,
        integrity_value: cryptoRes.authData.integrityValue,
      };

      for (const key in params) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.id = key;
        input.value = params[key];
        form.appendChild(input);
      }

      // // 모듈 방식 파라미터 세팅
      // const params: Record<string, string> = {
      //   m: "checkplusService",
      //   EncodeData: token_val,
      // };

      // for (const key in params) {
      //   const input = document.createElement("input");
      //   input.type = "hidden";
      //   input.name = key;
      //   input.value = params[key];
      //   form.appendChild(input);
      // }

      document.body.appendChild(form);

      const popup = window.open(
        "",
        "nice_auth_popup",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup)
        throw new Error("팝업을 열 수 없습니다. 팝업 차단을 해제해주세요.");

      form.submit();

      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        const { type, enc_data, integrity_value, token_version_id, message } =
          event.data;

        if (type === "NICE_AUTH_SUCCESS") {
          const verifyPayload: any = { enc_data };
          if (integrity_value) verifyPayload.integrity_value = integrity_value;
          if (token_version_id)
            verifyPayload.token_version_id = token_version_id;

          try {
            const verifyRes = await axios.post(
              "/api/nice/verify",
              verifyPayload
            );
            onAuthSuccess(verifyRes.data.data);
          } catch {
            onAuthError("인증 검증 실패");
          }
        } else {
          onAuthError(message || "인증 중 오류 발생");
        }

        popup.close();
        window.removeEventListener("message", messageHandler);
        setIsLoading(false);
      };

      window.addEventListener("message", messageHandler);

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener("message", messageHandler);
          setIsLoading(false);
        }
      }, 1000);
    } catch (error: any) {
      onAuthError(error.message || "알 수 없는 오류");
      setIsLoading(false);
    }
  };

  // const handleAuth = async (): Promise<void> => {
  //   try {
  //     setIsLoading(true);

  //     // Step 1. access token 발급
  //     const { data: tokenRes } = await axios.post("/api/nice/token");
  //     const accessToken = tokenRes.data.dataBody.access_token;
  //     console.log("🚀 ~ handleAuth ~ tokenRes:", tokenRes);

  //     // Step 2. 암호화 토큰 발급
  //     const { data: cryptoRes } = await axios.post("/api/nice/crypto-token", {
  //       token: accessToken,
  //     });
  //     console.log("🚀 ~ handleAuth ~ cryptoRes:", cryptoRes);

  //     const { token_val, integrity_value, token_version_id } = cryptoRes.data;

  //     // Step 3. 인증 팝업 호출
  //     const authUrl = `https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb`;
  //     const form = document.createElement("form");
  //     form.method = "POST";
  //     form.action = authUrl;
  //     form.target = "nice_auth_popup";

  //     // const params: Record<string, string> = {
  //     //   m: "checkplusService",
  //     //   EncodeData: tokenVal,
  //     //   reserved1: "",
  //     //   reserved2: "",
  //     //   reserved3: "",
  //     // };

  //     const params: Record<string, string> = {
  //       m: "service",
  //       token_version_id,
  //       enc_data: token_val,
  //       integrity_value,
  //     };

  //     console.log("🚀 ~ handleAuth ~ params:", params);

  //     for (const key in params) {
  //       const input = document.createElement("input");
  //       input.type = "hidden";
  //       input.name = key;
  //       input.value = params[key];
  //       form.appendChild(input);
  //     }

  //     // for (const key in params) {
  //     //   const input = document.createElement("input");
  //     //   input.type = "hidden";
  //     //   input.name = key;
  //     //   input.value = params[key];
  //     //   form.appendChild(input);
  //     // }

  //     document.body.appendChild(form);

  //     const popup = window.open(
  //       "",
  //       "nice_auth_popup",
  //       "width=500,height=600,scrollbars=yes,resizable=yes"
  //     );

  //     if (!popup)
  //       throw new Error("팝업을 열 수 없습니다. 팝업 차단을 해제해주세요.");

  //     form.submit();

  //     const messageHandler = async (event: MessageEvent) => {
  //       console.log("Event", event);
  //       if (event.origin !== window.location.origin) return;

  //       const { type, enc_data, integrity_value, token_version_id, message } =
  //         event.data;

  //       if (type === "NICE_AUTH_SUCCESS") {
  //         // Step 4. 검증 요청
  //         const verifyRes = await axios.post("/api/nice/verify", {
  //           enc_data,
  //           integrity_value,
  //           token_version_id,
  //         });

  //         // 인증 성공 처리
  //         onAuthSuccess(verifyRes.data.data);
  //       } else {
  //         onAuthError(message || "인증 중 오류 발생");
  //       }

  //       popup.close();
  //       window.removeEventListener("message", messageHandler);
  //       setIsLoading(false);
  //     };

  //     window.addEventListener("message", messageHandler);

  //     // 팝업 닫힘 감지
  //     const checkClosed = setInterval(() => {
  //       if (popup.closed) {
  //         clearInterval(checkClosed);
  //         window.removeEventListener("message", messageHandler);
  //         setIsLoading(false);
  //       }
  //     }, 1000);
  //   } catch (error: any) {
  //     onAuthError(error.message || "알 수 없는 오류");
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div>
      <button
        onClick={handleAuth}
        disabled={isLoading}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: isLoading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.6 : 1,
          transition: "all 0.2s ease",
        }}
      >
        {isLoading ? "인증 진행중..." : "본인인증"}
      </button>
    </div>
  );
};

export default NiceAuth;
