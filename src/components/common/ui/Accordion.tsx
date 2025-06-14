"use client";

import React, { useState } from "react";

type AccordionProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultActive?: boolean;
};

const Accordion: React.FC<AccordionProps> = ({
  header,
  children,
  defaultActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultActive);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="rounded-md overflow-hidden">
      <button
        type="button"
        onClick={toggle}
        className="w-full flex justify-between items-center bg-white transition-colors p-[14px]"
      >
        <div className="text-left">{header}</div>
        <div
          className={`w-[20px] h-[20px] origin-center transition-transform duration-300 rotate-0 flex justify-center items-center ${
            isOpen && "rotate-180"
          }`}
        >
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 5.88086L8 -0.000156403L2.39916e-08 -0.000156403L4 5.88086Z"
              fill="#999999"
            ></path>
          </svg>
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isOpen
            ? "max-h-[1000px] opacity-100 border-t-[1px] border-solid border-[#F7F7F7]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-sm">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
