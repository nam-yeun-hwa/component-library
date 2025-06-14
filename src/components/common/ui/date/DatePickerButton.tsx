"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

type DatePickerButtonProps = {
  defaultDate?: Date;
  onChange?: (date: Date) => void;
  dateFormat?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  defaultDate = null,
  onChange,
  dateFormat = "yyyy-MM-dd",
  placeholder = "날짜 선택",
  minDate,
  maxDate,
  className = "",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date ?? new Date());
    setIsOpen(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white ${className}`}
      >
        <span className="text-[0.875rem]">
          {selectedDate ? (
            <span>{format(selectedDate, dateFormat)}</span>
          ) : (
            <span className="text-[#8C8C8C]">{placeholder}</span>
          )}
        </span>
        <Image
          src="/images/calendar2.svg"
          alt="Calendar Icon"
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl relative"
          >
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={ko}
              inline
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DatePickerButton;
