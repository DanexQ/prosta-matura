import { FormDataType } from "@components/Form";
import { FieldValues } from "react-hook-form";

export const REGISTER_FORM_DATA: FormDataType[] = [
  {
    id: "username",
    type: "text",
    label: "Nazwa użytkownika",
    errorMessage: "Nazwa użytkownika jest wymagana!",
  },
  {
    id: "email",
    type: "email",
    label: "E-mail",
    errorMessage: "E-mail jest wymagany!",
    validate: (fieldValue: string) => {
      return (
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fieldValue) ||
        "Nieprawidłowy e-mail!"
      );
    },
  },
  {
    id: "password",
    label: "Hasło",
    type: "password",
    errorMessage: "Hasło jest wymagane",
    validate: (fieldValue: string) => {
      return (
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          fieldValue
        ) ||
        "Hasło musi posiadać minumim 8 znaków w tym conajmniej: wielką i małą literę oraz cyfrę!"
      );
    },
  },
  {
    id: "confirmPassword",
    label: "Potwierdź hasło",
    type: "password",
    errorMessage: "Potwierdź hasło!",
    validate: (fieldValue: string, formValues: FieldValues) => {
      return fieldValue === formValues.password || "Hasła nie są takie same!";
    },
  },
];
