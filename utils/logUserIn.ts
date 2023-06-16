"use server";

import { FieldValues } from "react-hook-form";

export const logUserIn = async (formData: FieldValues) => {
  console.log(formData);
};
