"use server";

import { auth } from "@firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FieldValues } from "react-hook-form";

export const logUserIn = async (formData: FieldValues) => {
  await signInWithEmailAndPassword(auth, formData.email, formData.password);
};
