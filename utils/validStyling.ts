import { registerStateType } from "@components/FormRegister";
import { FormState } from "react-hook-form";

export const validStyling = (fieldName: string, formState:FormState<registerStateType>): string => {
    const {dirtyFields, errors } = formState;
    const isDirty = dirtyFields[fieldName as keyof typeof dirtyFields] || false;
    const fieldError = Object.keys(errors).includes(fieldName);
    let styling = "border-neutral-600";
    if (isDirty && !fieldError) styling = "border-green-600";
    if (fieldError) styling = "border-red-600";
    return styling;
  };