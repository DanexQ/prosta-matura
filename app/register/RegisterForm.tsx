"use client";
import FormInput from "@components/FormInput/FormInput";
import React from "react";
import { useForm } from "react-hook-form";

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    getValues,
  } = useForm<FormState>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = () => {};
  console.log(dirtyFields.confirmPassword?.valueOf());
  const errorStyling = (isError: boolean) => {
    return isError ? "border-red-600" : "";
  };
  return (
    <form
      className="flex flex-col w-full gap-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor="username"
        className="text-sm font-semibold tracking-wider"
      >
        Nazwa użytkownika
      </label>
      <input
        id="username"
        {...register("username", {
          required: { value: true, message: "Podaj nazwę użytkownika!" },
        })}
        className="p-2 mb-2 border bg-neutral-800 border-neutral-600 focus:outline-none focus:bg-neutral-600/50"
      />
      <p>{errors?.username?.message}</p>
      <label htmlFor="email" className="text-sm font-semibold tracking-wider">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        {...register("email", {
          required: { value: true, message: "Niepoprawny email!" },
        })}
        className="p-2 mb-2 border bg-neutral-800 border-neutral-600 focus:outline-none focus:bg-neutral-600/50"
      />
      <p>{errors.email?.message}</p>
      <label
        htmlFor="password"
        className="text-sm font-semibold tracking-wider"
      >
        Hasło
      </label>
      <input
        id="password"
        {...register("password", {
          required:
            "Hasło musi posiadać minumim 8 znaków w tym conajmniej: wielką i małą literę oraz cyfrę!",
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          validate: {
            followPattern: (fieldValue) => {
              return (
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                  fieldValue
                ) ||
                "Hasło musi posiadać minumim 8 znaków w tym conajmniej: wielką i małą literę oraz cyfrę!"
              );
            },
          },
        })}
        className={`p-2 mb-2 border bg-neutral-800 border-neutral-600 focus:outline-none focus:bg-neutral-600/50 ${errorStyling(
          !!errors.password?.message
        )}`}
      />
      {errors.password?.message}
      <label
        htmlFor="confirmPassword"
        className="text-sm font-semibold tracking-wider"
      >
        Potwierdź hasło
      </label>
      <input
        id="confirmPassword"
        {...register("confirmPassword", {
          required: true,
          validate: {
            samePasswords: (fieldValue) => {
              return (
                fieldValue === getValues("password") ||
                "Hasła nie są takie same!"
              );
            },
          },
        })}
        className="p-2 mb-2 border bg-neutral-800 border-neutral-600 focus:outline-none focus:bg-neutral-600/50"
      />
      {errors.confirmPassword?.message}
      <button className="py-3 mt-2 font-semibold uppercase btn-primary">
        Załóż konto
      </button>
    </form>
  );
};

export default RegisterForm;
