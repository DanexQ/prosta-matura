"use client";
import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  return (
    <button className="btn-primary" onClick={() => signIn("google")}>
      Logowanie za pomocą Google
    </button>
  );
};

export default SignInButton;
