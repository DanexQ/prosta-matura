import React from "react";
import Image from "next/image";
import RegisterIcon from "@assets/RegisterIcon.png";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { FieldValues } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@firebase";
import { redirect } from "next/navigation";

export type registerStateType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const FormRegister = () => {
  const handleSubmit = async (formData: FieldValues) => {
    "use server";
    const { username, email, password } = formData;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: username });
      sendEmailVerification(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Image src={RegisterIcon} height={50} width={50} alt="Register icon" />
      <h2 className="text-2xl font-bold uppercase">Utwórz nowe konto</h2>
      <RegisterForm onSubmit={handleSubmit} />
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
    </React.Fragment>
  );
};

export default FormRegister;
