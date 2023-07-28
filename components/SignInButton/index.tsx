"use client";
import { signIn } from "next-auth/react";
import React from "react";
import GoogleIcon from "@assets/GoogleIcon.png";
import Image from "next/image";

const SignInButton = () => {
  return (
    <button
      className="flex items-center gap-3 p-3 text-sm btn-primary sm:text-base"
      onClick={() => signIn("google")}
    >
      <Image src={GoogleIcon} width={24} height={24} alt="Google Icon" />
      Logowanie za pomocą Google
    </button>
  );
};

export default SignInButton;
