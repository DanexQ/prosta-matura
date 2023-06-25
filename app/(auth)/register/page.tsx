import Link from "next/link";
import RegisterForm from "../../../components/FormRegister";
import FormPage from "@components/FormPage";

export const metadata = {
  title: "Rejestracja konta | Prosta Matura",
};

export default async function Page() {
  return (
    <FormPage>
      <RegisterForm />
    </FormPage>
  );
}
