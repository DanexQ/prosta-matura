"use client";
import { useRouter } from "next/navigation";

const ButtonCloseModal = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();

  const handleClick = typeof onClick !== "undefined" ? onClick : router.back;

  return (
    <button
      onClick={() => handleClick()}
      className="absolute text-xl transition-all top-5 right-5 hover:text-fuchsia-500 active:scale-[0.95]"
    >
      &#10006;
    </button>
  );
};

export default ButtonCloseModal;
