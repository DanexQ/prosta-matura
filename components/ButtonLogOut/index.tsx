"use client";

import Button from "@components/Button";
import { signOut } from "next-auth/react";

const index = () => {
  return (
    <Button
      handleClick={() => signOut()}
      styling="p-2 font-bold uppercase btn-primary bg-red-500/60 hover:bg-red-600/80 after:bg-red-500"
    >
      Wyloguj się{" "}
    </Button>
  );
};

export default index;
