"use server";

import { signIn } from "next-auth/react";
import { SignInResponse } from "next-auth/react/types";
import { FieldValues } from "react-hook-form";

export const signInCredentials = async ({
  email,
  password,
}: FieldValues): Promise<SignInResponse | undefined> => {
  return signIn("credentials", { email, password, redirect: false });
};
