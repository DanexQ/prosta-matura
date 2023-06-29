import React from "react";
import Image from "next/image";
import RegisterIcon from "@assets/RegisterIcon.png";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export type registerStateType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const FormRegister = () => {
  return (
    <React.Fragment>
      <Image src={RegisterIcon} height={50} width={50} alt="Register icon" />
      <h2 className="text-2xl font-bold uppercase">Utwórz nowe konto</h2>
      <RegisterForm />
      <span className="text-xs">
        Masz już konto?{" "}
        <Link
          href="/auth/signin"
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
