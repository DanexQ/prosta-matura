"use client";
import React from "react";

const Button = ({
  children,
  handleClick,
  styling = "",
}: {
  children: React.ReactNode;
  handleClick?: () => void;
  styling?: string;
}) => {
  return (
    <button className={`btn-primary ${styling}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
