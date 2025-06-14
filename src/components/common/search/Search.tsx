"use client";
import { useState, useEffect } from "react";

const Search = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="relative w-full mt-2">
      <div className="max-w-[80%] mx-auto">
        <div className="relative">
          <img
            src="/images/reading_glasses.svg"
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2  fill-black text-gray-800"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-[50px] h-[35px] text-sm bg-transparent border-b border-[#666666] focus:outline-none "
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
