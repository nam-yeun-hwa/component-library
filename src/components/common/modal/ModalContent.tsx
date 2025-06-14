interface ModalContentProps {
  title?: string;
  desc?: React.ReactNode;
  buttons?: React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  desc,
  buttons,
}) => {
  return (
    <div className="w-full flex flex-col justify-center">
      {title && (
        <h2 className="mb-5 text-section-h2 text-gray-800 text-center font-normal">
          {title}
        </h2>
      )}
      {desc && (
        <div className="mb-2.5 text-base text-gray-600 leading-6 text-center">
          {desc}
        </div>
      )}
      {buttons && (
        <div className="w-full flex justify-center mt-4 gap-4">{buttons}</div>
      )}
    </div>
  );
};

export default ModalContent;
