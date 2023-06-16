"use client";
import React from "react";
import Form from "@components/Form/Form";
import { LOGIN_FORM_DATA } from "./loginFormDetails";
import { FieldValues } from "react-hook-form";

export type loginStateType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const defaultValues: loginStateType = {
    email: "",
    password: "",
  };
  const handleSubmit = (formData: FieldValues) => {
    console.log(formData);
  };

  return (
    <Form
      formData={LOGIN_FORM_DATA}
      onSubmit={handleSubmit}
      buttonLabel="Zaloguj się"
      defaultValues={defaultValues}
    />
  );
};

export default LoginForm;
