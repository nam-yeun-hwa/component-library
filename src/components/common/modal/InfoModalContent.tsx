interface InfoModalContentProps {
  title?: string;
  desc?: React.ReactNode;
  buttons?: React.ReactNode;
  onClose: () => void;
}

const InfoModalContent: React.FC<InfoModalContentProps> = ({
  title,
  desc,
  onClose,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        {title && (
          <h2 className="text-[#3B3B3B] text-center font-normal font-semibold">
            {title}
          </h2>
        )}
        <button onClick={onClose}>
          <img
            src="/images/close_icon.svg"
            width={16}
            height={16}
            alt="닫기 아이콘"
          />
        </button>
      </div>
      {desc && (
        <div className="mt-8 w-full overflow-y-auto max-h-[25vh] pr-2">
          {desc}
        </div>
      )}
    </div>
  );
};

export default InfoModalContent;
