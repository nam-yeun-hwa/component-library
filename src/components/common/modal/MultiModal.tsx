import { useState } from "react";
import classNames from "classnames";
import ModalContent from "@/components/common/modal/ModalContent";
import InfoModalContent from "./InfoModalContent";

interface ImageModalData {
  imageUrl?: string;
  title?: string;
  desc?: React.ReactNode;
}

interface ConfirmModalData {
  title?: string;
  desc?: React.ReactNode;
  confirmText?: string;
  onConfirm: () => void;
}

interface YesNoModalData {
  title?: string;
  desc?: React.ReactNode;
  yesText?: string;
  noText?: string;
  onYes: () => void;
  onNo?: () => void;
}

interface InfoModalData {
  title?: string;
  desc?: React.ReactNode;
}

type ModalType = "image" | "confirm" | "yesNo" | "password" | "info";
type ModalData =
  | ImageModalData
  | ConfirmModalData
  | YesNoModalData
  | InfoModalData;

/**
 * @interface MultiModalProps
 * @description MultiModal 컴포넌트의 props 인터페이스
 * @property {ModalType | null} modalType - 표시할 모달의 타입 ('image', 'confirm', 'yesNo', 'password')
 * @property {() => void} onClose - 모달을 닫는 콜백 함수
 * @property {ModalData} data - 모달 타입에 따라 필요한 데이터 (ImageModalData, ConfirmModalData, YesNoModalData)
 */
interface MultiModalProps {
  modalType: ModalType | null;
  onClose: () => void;
  data: ModalData;
}

/**
 * @function MultiModal
 * @description 다양한 모달 타입('image', 'confirm', 'yesNo', 'password')을 지원하는 재사용 가능한 모달 컴포넌트
 * @param {MultiModalProps} props - 모달 컴포넌트의 props
 * @example
 * // 이미지 모달
 * <MultiModal
 *   modalType="image"
 *   onClose={() => console.log("모달 닫힘")}
 *   data={{ imageUrl: "https://example.com/image.jpg", title: "이미지 모달", desc: "설명" }}
 * />
 *
 * // 확인 모달
 * <MultiModal
 *   modalType="confirm"
 *   onClose={() => console.log("모달 닫힘")}
 *   data={{ title: "확인", desc: "계속 진행하시겠습니까?", confirmText: "확인", onConfirm: () => console.log("확인됨") }}
 * />
 *
 * // 예/아니오 모달
 * <MultiModal
 *   modalType="yesNo"
 *   onClose={() => console.log("모달 닫힘")}
 *   data={{
 *     title: "예/아니오",
 *     desc: "계속 진행하시겠습니까?",
 *     yesText: "예",
 *     noText: "아니오",
 *     onYes: () => console.log("예"),
 *     onNo: () => console.log("아니오")
 *   }}
 * />
 *
 * // 안내 스크롤 모달
 * <MultiModal
 *   modalType="info"
 *   onClose={() => console.log("모달 닫힘")}
 *   data={{
 *     title: "안내",
 *     desc: "설명",
 *   }}
 * />
 *
 */
const MultiModal: React.FC<MultiModalProps> = ({
  modalType,
  onClose,
  data,
}) => {
  const [isClosing, setIsClosing] = useState(false); // 애니메이션 상태 관리

  /**
   * @function handleClose
   * @description 모든 모달 타입에 대해 페이드아웃 애니메이션(0.3초)으로 모달을 닫습니다.
   * isClosing 상태를 true로 설정한 후, 애니메이션 지속 시간 후 onClose 호출
   */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // 애니메이션 지속 시간(0.3초)
  };

  /**
   * @function handleConfirm
   * @description 'confirm' 모달의 onConfirm 콜백을 실행하고 모달을 닫습니다.
   * @param {() => void} onConfirm - 확인 버튼 클릭 시 실행할 콜백
   */
  const handleConfirm = (onConfirm: () => void) => {
    onConfirm();
    handleClose();
  };

  /**
   * @function handleYesNo
   * @description 'yesNo' 모달의 onYes 또는 onNo 콜백을 실행하고 모달을 닫습니다.
   * @param {() => void} callback - 예 또는 아니오 버튼 클릭 시 실행할 콜백
   */
  const handleYesNo = (callback: () => void) => {
    callback();
    handleClose();
  };

  if (!modalType) return null;

  /**
   * @function renderContent
   * @description modalType에 따라 적절한 모달 콘텐츠를 렌더링합니다.
   * - 'image': 이미지와 선택적 제목, 설명 표시
   * - 'confirm': 제목, 설명, 확인 버튼 표시
   * - 'yesNo': 제목, 설명, 예/아니오 버튼 표시
   * - 'password': 구현되지 않음 (오류 메시지 표시)
   * @returns {JSX.Element} 렌더링된 모달 콘텐츠
   */
  const renderContent = () => {
    switch (modalType) {
      case "image":
        if ("imageUrl" in data) {
          return (
            <div className="w-full box-border rounded-lg bg-white">
              <img
                src={
                  data.imageUrl ||
                  "https://i.pinimg.com/736x/94/4b/17/944b17fdaef9aaa8a0713a3ce5ad11ba.jpg"
                }
                alt="modal"
                className="w-full h-auto rounded-md m-0"
              />
              <ModalContent title={data.title} desc={data.desc} />
            </div>
          );
        }
        break;

      case "confirm":
        if ("onConfirm" in data) {
          return (
            <ModalContent
              title={data.title}
              desc={data.desc}
              buttons={
                <button
                  onClick={() => handleConfirm(data.onConfirm)}
                  className="px-5 py-2.5 mx-1.5 bg-blue-600 text-white rounded-md text-base cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  {data.confirmText || "확인"}
                </button>
              }
            />
          );
        }
        break;

      case "yesNo":
        if ("onYes" in data) {
          return (
            <ModalContent
              title={data.title}
              desc={data.desc}
              buttons={
                <>
                  <button
                    onClick={() => handleYesNo(data.onYes)}
                    className="px-5 py-2.5 w-full bg-blue-600 text-white rounded-md text-base cursor-pointer transition-colors"
                  >
                    {data.yesText || "예"}
                  </button>
                  <button
                    onClick={() => handleYesNo(data.onNo || handleClose)}
                    className="px-5 py-2.5 w-full bg-gray-200 text-gray-700 rounded-md text-base cursor-pointer transition-colors"
                  >
                    {data.noText || "아니오"}
                  </button>
                </>
              }
            />
          );
        }
        break;

      case "info":
        return (
          <div className="w-full box-border rounded-lg bg-white">
            <InfoModalContent
              title={data.title}
              desc={data.desc}
              onClose={handleClose}
            />
          </div>
        );
        break;

      default:
        return <p className="text-gray-600">알 수 없는 모달 타입입니다.</p>;
    }
  };

  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000]",
        {
          "animate-fadeOut": isClosing,
          "animate-fadeIn": !isClosing,
        }
      )}
      onClick={modalType === "image" ? handleClose : undefined}
    >
      <div
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={handleClose}
      >
        <svg
          className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        className="relative max-w-[500px] w-[90%] bg-white rounded-xl p-[20px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col items-center"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default MultiModal;
