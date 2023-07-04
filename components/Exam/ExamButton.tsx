"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ExamButton = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const handleClick = () => {
    return function () {
      router.push(url);
    };
  };

  return (
    <button className="btn-primary" onClick={handleClick()}>
      {children}
    </button>
  );
};

export default ExamButton;
