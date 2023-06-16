"use client";
import React from "react";
import Form from "@components/Form/Form";
import { LOGIN_FORM_DATA } from "./loginFormDetails";
import { logUserIn } from "@utils/logUserIn";

export type loginStateType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const defaultValues: loginStateType = {
    email: "",
    password: "",
  };

  return (
    <Form
      formData={LOGIN_FORM_DATA}
      authFun={logUserIn}
      buttonLabel="Zaloguj się"
      defaultValues={defaultValues}
    />
  );
};

export default LoginForm;
