"use client";

import Image from "next/image";
import React, { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  md: "w-[46px] h-[46px]",
  xl: "w-[90px] h-[90px]",
};

const sizePx = {
  md: 46,
  xl: 90,
};

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = "md", className = "" }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const sizeClass = sizeClasses[size];
  const pixelSize = sizePx[size];

  return (
    <div className={`${sizeClass} relative rounded-full overflow-hidden bg-gray-200 ${className}`}>
      {src && !imageError ? (
        <Image
          src={src || "/images/profile.svg"}
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <Image
          src="/images/profile.svg"
          alt="Default avatar"
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default Avatar;
