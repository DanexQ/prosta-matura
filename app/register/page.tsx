import RegisterForm from "../../components/RegisterForm/RegisterForm";
import FormPage from "@components/FormPage/FormPage";

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
