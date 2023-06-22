"use client";

import { useRouter } from "next/navigation";
const ButtonCloseModal = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="absolute text-xl transition-all top-5 right-5 hover:text-fuchsia-500 active:scale-[0.95]"
    >
      &#10006;
    </button>
  );
};

export default ButtonCloseModal;
