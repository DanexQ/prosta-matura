import { FormDataType } from "@components/Form/Form";
import { loginStateType } from "./LoginForm";

export const LOGIN_FORM_DATA: FormDataType[] = [
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
  },
];
