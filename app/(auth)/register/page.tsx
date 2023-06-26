import Link from "next/link";
import RegisterForm from "../../../components/FormRegister";
import FormPage from "@components/FormPage";
import { auth } from "@firebase";

export const metadata = {
  title: "Rejestracja konta | Prosta Matura",
};

export default async function Page() {
  console.log(auth.currentUser);
  return (
    <FormPage>
      <RegisterForm />
    </FormPage>
  );
}
