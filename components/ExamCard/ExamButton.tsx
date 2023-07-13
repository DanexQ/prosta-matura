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
    router.replace(url);
  };

  return (
    <button className="px-4 py-2 btn-primary" onClick={handleClick}>
      {children}
    </button>
  );
};

export default ExamButton;
