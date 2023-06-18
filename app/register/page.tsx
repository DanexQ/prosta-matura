import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "../global.css";
import FormPage from "@components/FormPage/FormPage";

export const metadata = {
  title: "Rejestracja konta | Prosta Matura",
};

export default function Page() {
  return (
    <FormPage>
      <RegisterForm />
    </FormPage>
  );
}
