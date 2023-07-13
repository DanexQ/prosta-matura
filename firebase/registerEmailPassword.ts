"use server";

import { auth, db } from "@firebase";
import { FirebaseError } from "firebase-admin";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
    await setDoc(doc(db, "completedTasks", user.uid), { completedTasks: [] });
    sendEmailVerification(user);
  } catch (err) {
    const error = err as FirebaseError;
    throw new Error(
      `registerEmailPassword Error - ${(error.code, error.message)}`
    );
  }
};
