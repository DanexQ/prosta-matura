import React from "react";
import Image from "next/image";
import LoginIcon from "@assets/loginIcon.png";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { FieldValues } from "react-hook-form";

const FormLogin = () => {
  const handleSubmit = async (formData: FieldValues) => {
    "use server";
    try {
      console.log(formData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Image src={LoginIcon} height={50} width={50} alt="Login icon" />
      <h2 className="text-2xl font-bold uppercase">Logowanie</h2>
      <LoginForm onSubmit={handleSubmit} />
      <span className="text-xs">
        Nie masz jeszcze konta?{" "}
        <Link
          href="/register"
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
