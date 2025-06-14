import newStyled from "@emotion/styled";
import closeIcon from "../../assets/images/icon/close.svg";
import { ReactNode } from "react";

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  title?: string;
  description?: string;
}

// 모달 타입 정의
export type ModalType = "image" | "confirm" | "yesNo" | "password";

// 데이터 인터페이스 정의
export interface ImageModalData {
  imageUrl?: string;
}

export interface ConfirmModalData {
  title: string;
  desc?: ReactNode;
  confirmText?: string;
  onConfirm: () => void;
}

export interface YesNoModalData {
  title: string;
  desc?: ReactNode;
  yesText?: string;
  noText?: string;
  onYes: () => void;
  onNo?: () => void;
}

export type ModalData = ImageModalData | ConfirmModalData | YesNoModalData;

interface MultiModalProps {
  modalType: ModalType | null;
  onClose?: () => void;
  // onClick?: () => void;
  data: ModalData;
}

const MultiModal: React.FC<MultiModalProps> = ({
  modalType,
  onClose,
  // onClick,
  data,
}) => {
  if (!modalType) return null;

  const renderContent = () => {
    switch (modalType) {
      case "image":
        if ("imageUrl" in data) {
          return (
            <ModalStyle>
              <Image
                src={
                  data.imageUrl ||
                  "https://i.pinimg.com/736x/94/4b/17/944b17fdaef9aaa8a0713a3ce5ad11ba.jpg"
                }
                alt="modal"
              />
            </ModalStyle>
          );
        }

      case "confirm":
        if ("onConfirm" in data) {
          return (
            <ModalWrapStyle>
              {data.title && <Title>{data.title}</Title>}
              {data.desc && <Description>{data.desc}</Description>}

              <Button primary onClick={data.onConfirm}>
                {data.confirmText || "확인"}
              </Button>
            </ModalWrapStyle>
          );
        }

      case "yesNo":
        if ("onYes" in data) {
          return (
            <ModalWrapStyle>
              {data.title && <Title>{data.title}</Title>}
              {data.desc && <Description>{data.desc}</Description>}
              <ButtonWrapper>
                <Button primary onClick={data.onYes}>
                  {data.yesText || "예"}
                </Button>
                <Button onClick={data.onNo || onClose}>
                  {data.noText || "아니오"}
                </Button>
              </ButtonWrapper>
            </ModalWrapStyle>
          );
        }

      default:
        return <p>알 수 없는 모달 타입입니다.</p>;
    }
  };
  return (
    <Overlay>
      <CloseBtnStyle onClick={onClose ? () => onClose() : undefined}>
        <img src={closeIcon} />
      </CloseBtnStyle>
      <Content onClick={(e) => e.stopPropagation()}>{renderContent()}</Content>
    </Overlay>
  );
};

export default MultiModal;

const Overlay = newStyled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = newStyled.div`
  position: relative;
	max-width: 800px;
  background: #fff;
  border-radius: 12px;
  padding: 30px 40px;
  // max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBtnStyle = newStyled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 10;

  & img {
    width: 24px;
    height: 24px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  &:hover img {
    opacity: 1;
  }
`;

/**
 * 이미지 모달컨테이너
 */
const ModalStyle = newStyled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #fff;
	

  & img {
    width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 0;
  }
`;

const Title = newStyled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: #222;
	text-align: center;
	font-weight: 400;
`;

const Description = newStyled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;

  & span {
    font-size: 0.85rem;
    color: #888;
  }
`;

const Button = newStyled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  margin: 0 6px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ primary }) => (primary ? "#007bff" : "#e0e0e0")};
  color: ${({ primary }) => (primary ? "white" : "#333")};
  transition: background 0.2s;

  &:hover {
    background: ${({ primary }) => (primary ? "#0056b3" : "#ccc")};
  }
`;

const ButtonWrapper = newStyled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Image = newStyled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 16px;
`;

/**
 * 이미지모달 외 모달
 */
const ModalWrapStyle = newStyled.div`
width: 550px;
display: flex;
flex-direction: column;
justify-content: center;
`;
