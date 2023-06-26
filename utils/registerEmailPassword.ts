"use server"

import { auth } from "@firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { redirect } from "next/navigation"
import { FieldValues } from "react-hook-form"

export const registerEmailPassword = async (formData:FieldValues) => {
    const {username,email,password} = formData;
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {displayName:username});
    sendEmailVerification(user);
}