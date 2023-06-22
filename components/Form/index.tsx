"use client";
import { loginStateType } from "@components/FormLogin";
import { registerStateType } from "@components/FormRegister";
import React from "react";
import { FieldValues, Validate, useForm } from "react-hook-form";

type FormProps = {
  formData: FormDataType[];
  buttonLabel: string;
  authFun: (formData: FieldValues) => Promise<void>;
  defaultValues: registerStateType | loginStateType;
};

export type FormDataType = {
  id: "password" | "username" | "email" | "confirmPassword";
  type: string;
  label: string;
  errorMessage: string;
  validate?: Validate<string, FieldValues>;
};

function Form({ formData, buttonLabel, authFun, defaultValues }: FormProps) {
  const { register, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
  });
  const { errors, dirtyFields } = formState;

  const validationBorderColor = (fieldName: string): string => {
    const isDirty = dirtyFields[fieldName as keyof typeof dirtyFields] || false;
    const fieldError = Object.keys(errors).includes(fieldName);
    let styling = "border-neutral-600";
    if (isDirty && !fieldError) styling = "border-green-600";
    if (fieldError) styling = "border-red-600";
    return styling;
  };

  const formElements = formData.map((data) => {
    const borderColor = validationBorderColor(data.id);
    return (
      <div key={data.id} className="flex flex-col">
        <label
          htmlFor={data.id}
          className="text-sm font-semibold tracking-wider"
        >
          {data.label}
        </label>
        <input
          type={data.type}
          id={data.id}
          {...register(data.id as keyof typeof defaultValues, {
            required: { value: true, message: data.errorMessage },
            validate: data.validate,
          })}
          className={` p-2 mb-2 bg-neutral-800 focus:outline-none focus:bg-neutral-600/50 border ${borderColor}`}
        />
        <p className="text-sm font-semibold text-red-500">
          {errors?.[data.id as keyof typeof errors]?.message?.toString()}
        </p>
      </div>
    );
  });

  const onSubmit = async (formValues: FieldValues) => {
    await authFun(formValues);
  };

  return (
    <form
      className="flex flex-col w-full gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formElements}
      <button className="py-3 mt-2 font-semibold uppercase btn-primary">
        {buttonLabel}
      </button>
    </form>
  );
}

export default Form;
