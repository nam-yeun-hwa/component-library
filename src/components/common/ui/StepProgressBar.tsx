interface ProgressBarProps {
  currentStep: number; // 0: 결제, 1: 입금, 2: 정산
}

const steps = ["결제", "입금", "정산"];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-[#0099FF] rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Step Labels */}
      <div className="relative mt-2 text-sm font-medium">
        {steps.map((label, index) => {
          const isActive = index <= currentStep;
          const baseStyle = "absolute top-0";
          const textStyle = isActive
            ? "text-[#0099FF] font-semibold"
            : "text-gray-400 font-semibold";

          const positionClass =
            index === 0
              ? "left-0"
              : index === 1
              ? "left-1/2 transform -translate-x-1/2"
              : "right-0 text-right";

          return (
            <div
              key={index}
              className={`text-[11px] ${baseStyle} ${positionClass} ${textStyle}`}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
