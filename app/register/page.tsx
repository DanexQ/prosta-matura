import RegisterForm from "./RegisterForm";
import RegisterIcon from "@/assets/RegisterIcon.png";
import Image from "next/image";

export const metadata = {
  title: "Rejestracja konta | Prosta Matura",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 p-10 border w-96 border-neutral-600">
        <Image src={RegisterIcon} height={50} width={50} alt="Register icon" />
        <h2 className="text-2xl font-bold uppercase">Utwórz nowe konto</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
