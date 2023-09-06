"use client";
import Button from "@Components/Button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <Button
      styling="p-2 font-bold uppercase btn-primary bg-red-500/60 hover:bg-red-600/80 after:bg-red-500"
      handleClick={() => signOut()}
    >
      Wyloguj się
    </Button>
  );
};

export default SignOutButton;
