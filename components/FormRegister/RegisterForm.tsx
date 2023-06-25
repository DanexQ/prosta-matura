"use client";

import React from "react";
import { registerStateType } from ".";
import { FieldValues, useForm } from "react-hook-form";
import { validStyling } from "@utils/validStyling";

const defaultValues: registerStateType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type RegisterFormProps = {
  onSubmit: (formData: FieldValues) => void;
};

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "all",
  });
  const { errors } = formState;
  // TODO: make validStyling a hook => it was throwing an error with rangeerror: maximum callstack...
  return (
    <form
      className="flex flex-col w-full gap-2"
      onSubmit={() => handleSubmit(onSubmit)}
    >
      {/* USERNAME */}
      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="text-sm font-semibold tracking-wider"
        >
          Nazwa użytkownika
        </label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Nazwa użytkownika jest wymagana!",
            },
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border `}
        />
        <p className="text-xs font-semibold text-red-500">
          {errors?.username?.message}
        </p>
      </div>

      {/* E-MAIL */}
      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="text-sm font-semibold tracking-wider"
        >
          E-mail
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "E-mail jest wymagany!",
            },
            validate: (fieldValue: string) => {
              return (
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fieldValue) ||
                "Nieprawidłowy e-mail!"
              );
            },
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border `}
        />
        <p className="text-xs font-semibold text-red-500">
          {errors?.email?.message}
        </p>
      </div>
      {/* PASSWORD */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-sm font-semibold tracking-wider"
        >
          Hasło
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Hasło jest wymagane",
            },
            validate: (fieldValue: string) => {
              return (
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                  fieldValue
                ) ||
                "Hasło musi posiadać minumim 8 znaków w tym conajmniej: wielką i małą literę oraz cyfrę!"
              );
            },
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border `}
        />
        <p className="text-xs font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>
      {/* CONFIRM PASSWORD */}
      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold tracking-wider"
        >
          Potwierdź hasło
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Potwierdź hasło!",
            },
            validate: (fieldValue: string, formValues: FieldValues) => {
              return (
                fieldValue === formValues.password || "Hasła nie są takie same!"
              );
            },
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border `}
        />
        <p className="text-xs font-semibold text-red-500">
          {errors?.confirmPassword?.message}
        </p>
      </div>
      <button className="py-3 mt-2 font-semibold uppercase btn-primary">
        Zarejestruj się
      </button>
    </form>
  );
};

export default RegisterForm;

{
  /* <Form
formData={REGISTER_FORM_DATA}
authFunction={registerEmailPassword}
buttonLabel="Załóż konto"
defaultValues={defaultValues}
/> */
}
