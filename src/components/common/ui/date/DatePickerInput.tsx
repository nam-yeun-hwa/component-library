import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

// 한국어 로케일 설정
dayjs.locale("ko");

interface DatePickerInputProps {
  register: UseFormRegisterReturn;
  name?: string;
  errors: FieldErrors;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ register }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleInputClick = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    setIsClosing(true);
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // 애니메이션 지속 시간(0.3초)과 일치
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  return (
    <div className="relative w-[125px] box-border">
      <div className="flex justify-between">
        <input
          type="text"
          {...register}
          value={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
          onClick={handleInputClick}
          readOnly
          placeholder="날짜를 선택하세요"
          className=" focus:outline-none outline-none  cursor-pointer"
        />
        <svg
          onClick={handleInputClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-4 ${
              isClosing ? "animate-slideUpFadeOut" : "animate-slideDown"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <DatePicker selected={selectedDate} onChange={handleChange} inline className="shadow-none" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
