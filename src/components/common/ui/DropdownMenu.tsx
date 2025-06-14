import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  buttonLabel: React.ReactNode;
  children: React.ReactNode;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export const DropdownMenu = ({
  buttonLabel,
  children,
  position = "bottom-left",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
  };

  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="px-4 py-2 transition">
        {buttonLabel}
      </button>

      {open && (
        <div
          className={`absolute ${positionClasses[position]} bg-white rounded-[10px] shadow-xl z-10`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="flex items-center justify-center gap-2 px-4 py-4 cursor-pointer text-caption-default whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
