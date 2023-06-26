import { loginStateType } from "@components/FormLogin";
import { registerStateType } from "@components/FormRegister";
import React, { useCallback, useMemo, useState } from "react";
import { FieldErrors, FieldValues, FormState } from "react-hook-form";

type props<T> = {
  values: T;
  errors: FieldErrors;
  dirtyFields: { [x: string]: boolean | undefined };
};

function useValidationStyle<T extends {}>({
  errors,
  dirtyFields,
  values,
}: props<T>): T {
  const style = useCallback(() => {
    let styling: T | {} = {};
    Object.keys(values).forEach((val) => {
      const isError = errors[val];
      const isDirty = dirtyFields[val];
      let style = "border-neutral-500";
      if (isError) style = "border-red-500";
      else if (isDirty) style = "border-green-500";
      styling[val as keyof typeof values] = style;
    });
    return styling;
  }, [errors, dirtyFields]);
  const styling = style();
  return { styling };
}

export default useValidationStyle;
