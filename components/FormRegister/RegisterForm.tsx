"use client";

import Form from "@components/Form";
import React from "react";
import { REGISTER_FORM_DATA } from "./registerFormDetails";
import { registerStateType } from ".";
import { registerEmailPassword } from "@utils/registerEmailPassword";

const defaultValues: registerStateType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  return (
    <Form
      formData={REGISTER_FORM_DATA}
      authFunction={registerEmailPassword}
      buttonLabel="Załóż konto"
      defaultValues={defaultValues}
    />
  );
};

export default RegisterForm;
