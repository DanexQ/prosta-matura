"use client";
import React, { ReactNode, useState } from "react";
import { registerStateType } from ".";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerEmailPassword } from "@firebase/registerEmailPassword";
import Modal from "@components/Modal";
import ButtonCloseModal from "@components/ButtonCloseModal";
import { FirebaseError } from "firebase/app";

const defaultValues: registerStateType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues,
    mode: "all",
  });
  const { errors, dirtyFields } = formState;
  const [modal, setModal] = useState<ReactNode | null>(null);
  const validStyle = (id: string) => {
    let style = "border-neutral-500";
    const isError = !!errors[id as keyof typeof errors]?.message;
    if (isError) style = "border-red-500";
    if (!isError && dirtyFields[id as keyof typeof dirtyFields])
      style = "border-green-500";
    return style;
  };

  const onSubmit: SubmitHandler<registerStateType> = async (formData) => {
    try {
      await registerEmailPassword(formData);
      setModal(
        <Modal>
          <ButtonCloseModal onClick={() => setModal(null)} />
          <div className="p-5 text-justify bg-green-600 border border-green-800">
            Żeby zakończyć rejestrację pomyślnie, potwierdź swoje konto za
            pomocą linku aktywacyjnego wysłanego na skrzynkę pocztową:{" "}
            {getValues("email")}.
          </div>
        </Modal>
      );
    } catch (err) {
      const error = err as FirebaseError;
      setModal(
        <Modal>
          <ButtonCloseModal onClick={() => setModal(null)} />
          <div className="p-5 bg-red-600">
            {error.message === "Firebase: Error (auth/email-already-in-use)."
              ? "Ten email jest już w użyciu"
              : "Przepraszamy, coś poszło nie tak. Spóbuj ponownie później."}
          </div>
        </Modal>
      );
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
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
            className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border ${validStyle(
              "username"
            )}`}
          />
          <p className="text-xs font-semibold text-red-500">
            {errors?.username?.message}
          </p>
        </div>

        {/* E-MAIL */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
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
              validate: (fieldValue: string) => {
                return (
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    fieldValue
                  ) ||
                  "Hasło musi posiadać minumim 8 znaków w tym conajmniej: wielką i małą literę oraz cyfrę!"
                );
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
                  fieldValue === formValues.password ||
                  "Hasła nie są takie same!"
                );
              },
            })}
            className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border ${validStyle(
              "confirmPassword"
            )}`}
          />
          <p className="text-xs font-semibold text-red-500">
            {errors?.confirmPassword?.message}
          </p>
        </div>
        {modal}
        <button className="py-3 mt-2 font-semibold uppercase btn-primary">
          Zarejestruj się
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
