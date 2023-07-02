"use server";

import { auth } from "@firebase";
import { FirebaseError } from "firebase-admin";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";

export const registerEmailPassword = async (formData: FieldValues) => {
  try {
    const { username, email, password } = formData;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: username });
    sendEmailVerification(user);
  } catch (err) {
    const error = err as FirebaseError;
    console.log({ error });
    throw err;
  }
};
