import Image from "next/image";
import LoginIcon from "@assets/LoginIcon.png";
import LoginForm from "@components/LoginForm/LoginForm";

export default function page() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 p-10 border w-96 border-neutral-600">
        <Image src={LoginIcon} height={50} width={50} alt="Register icon" />
        <h2 className="text-2xl font-bold uppercase">Logowanie</h2>
        <LoginForm />
      </div>
    </div>
  );
}
