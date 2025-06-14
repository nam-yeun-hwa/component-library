import React from "react";

const AuthTitle = ({ title }: { title: string }) => {
  return (
    <p className="text-2xl font-semibold text-gray-800 h-[24px]">{title}</p>
  );
};

export default AuthTitle;
