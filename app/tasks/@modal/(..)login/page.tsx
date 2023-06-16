import LoginForm from "@components/LoginForm/LoginForm";
import Image from "next/image";
import LoginIcon from "@assets/LoginIcon.png";
import CloseModalButton from "@components/Button/CloseModalButton";
import Link from "next/link";

export default function page() {
  return (
    <div className="fixed top-0 left-0 w-full min-h-[100vh] z-50 bg-neutral-900/90 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center h-full gap-5 p-10 border w-96 bg-neutral-900 border-neutral-600">
          <CloseModalButton />
          <Image src={LoginIcon} height={50} width={50} alt="Register icon" />
          <h2 className="text-2xl font-bold uppercase">Logowanie</h2>
          <LoginForm />
          <span className="text-xs">
            Nie masz jeszcze konta?{" "}
            <Link
              href="/register"
              className="font-semibold tracking-wider text-fuchsia-400"
            >
              Zarejestruj się
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
