"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const WRONG_PASSWORD = "Firebase: Error (auth/wrong-password).";

type loginStateType = {
  email: string;
  password: string;
};

const defaultValues: loginStateType = {
  email: "",
  password: "",
};

const SignIn = ({ redirectTo }: { redirectTo?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues,
    mode: "all",
  });
  const router = useRouter();
  const [signInStatus, setSignInStatus] = useState({
    error: "",
    loading: false,
  });

  const onSubmit: SubmitHandler<loginStateType> = async (
    { email, password },
    e
  ) => {
    e?.preventDefault();
    try {
      setSignInStatus((prevState) => ({ ...prevState, loading: true }));
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      res?.error === WRONG_PASSWORD &&
        setSignInStatus({ loading: false, error: "Błędne dane logowania!" });

      // If it's modal go back, otherwise go to a certain page
      if (res && !res.error)
        !!redirectTo ? router.push(redirectTo) : router.back();
    } catch (err) {
      if (err instanceof Error) {
        console.log("Please try again soon. Error:", err.message);
      }
    }
  };

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
      onSubmit={handleSubmit((data, e) => onSubmit(data, e))}
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
      {!!signInStatus.error && (
        <div className="p-5 uppercase bg-red-500">{signInStatus.error}</div>
      )}
      <button className="py-3 mt-2 font-semibold uppercase btn-primary">
        Zaloguj się
      </button>
    </form>
  );
};

export default SignIn;
