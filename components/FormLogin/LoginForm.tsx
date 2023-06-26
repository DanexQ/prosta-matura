"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type loginStateType = {
  email: string;
  password: string;
};

const defaultValues: loginStateType = {
  email: "",
  password: "",
};

type LoginFormProps = {
  onSubmit: (formData: FieldValues) => void;
};

const RegisterForm = ({ onSubmit }: LoginFormProps) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues,
    mode: "all",
  });
  const { errors, dirtyFields } = formState;

  const validStyle = (id: string) => {
    let style = "border-neutral-500";
    const isError = !!errors[id as keyof typeof errors]?.message;
    if (isError) style = "border-red-500";
    if (!isError && dirtyFields[id as keyof typeof dirtyFields])
      style = "border-green-500";
    return style;
  };

  return (
    <form
      className="flex flex-col w-full gap-2"
      onSubmit={() => handleSubmit(onSubmit)}
    >
      {/* E-MAIL */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-semibold tracking-wider">
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
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border ${validStyle(
            "email"
          )}`}
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
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border ${validStyle(
            "password"
          )}`}
        />
        <p className="text-xs font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>

      <button className="py-3 mt-2 font-semibold uppercase btn-primary">
        Zarejestruj się
      </button>
    </form>
  );
};

export default RegisterForm;
