import React from "react";
import Image from "next/image";
import LoginIcon from "@assets/loginIcon.png";
import Link from "next/link";
import LoginForm from "./LoginForm";

export type loginStateType = {
  email: string;
  password: string;
};

const FormLogin = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <>
      <Image src={LoginIcon} height={50} width={50} alt="Login icon" />
      <h2 className="text-2xl font-bold uppercase">Logowanie</h2>
      <LoginForm redirectTo={redirectTo} />
      <span className="text-xs">
        Nie masz jeszcze konta?{" "}
        <Link
          href="/auth/register"
          replace={true}
          className="font-semibold tracking-wider text-fuchsia-400"
        >
          Zarejestruj się
        </Link>
      </span>
    </>
  );
};

export default FormLogin;
