"use client";
import Button from "@components/Button";
import { useRouter } from "next/navigation";

const CloseModalButton = () => {
  const router = useRouter();
  return (
    <button
      className="absolute btn-primary top-2 right-2"
      onClick={() => {
        router.back();
      }}
    >
      X
    </button>
  );
};

export default CloseModalButton;
