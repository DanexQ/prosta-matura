"use client";
import React from "react";
import Form from "@components/Form";
import { LOGIN_FORM_DATA } from "./loginFormDetails";
import { logUserIn } from "@utils/logUserIn";
import Image from "next/image";
import LoginIcon from "@assets/loginIcon.png";
import Link from "next/link";

export type loginStateType = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const defaultValues: loginStateType = {
    email: "",
    password: "",
  };

  return (
    <>
      <Image src={LoginIcon} height={50} width={50} alt="Login icon" />
      <h2 className="text-2xl font-bold uppercase">Logowanie</h2>
      <Form
        formData={LOGIN_FORM_DATA}
        authFun={logUserIn}
        buttonLabel="Zaloguj się"
        defaultValues={defaultValues}
      />
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
