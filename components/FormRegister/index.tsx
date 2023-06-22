"use client";
import React from "react";
import { REGISTER_FORM_DATA } from "./registerFormDetails";
import Form from "@components/Form";
import { FieldValues } from "react-hook-form";
import { logUserIn } from "@utils/logUserIn";
import Image from "next/image";
import RegisterIcon from "@assets/RegisterIcon.png";
import Link from "next/link";

export type registerStateType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const FormRegister = () => {
  const defaultValues: registerStateType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (formData: FieldValues) => {
    console.log(formData);
  };

  return (
    <>
      <Image src={RegisterIcon} height={50} width={50} alt="Register icon" />
      <h2 className="text-2xl font-bold uppercase">Utwórz nowe konto</h2>
      <Form
        formData={REGISTER_FORM_DATA}
        authFun={logUserIn}
        buttonLabel="Załóż konto"
        defaultValues={defaultValues}
      />
      <span className="text-xs">
        Masz już konto?{" "}
        <Link
          href="/login"
          replace={true}
          className="font-semibold tracking-wider text-fuchsia-400"
        >
          Zaloguj się
        </Link>
      </span>
    </>
  );
};

export default FormRegister;
