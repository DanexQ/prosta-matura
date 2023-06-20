import FormPage from "@components/FormPage/FormPage";
import LoginForm from "@components/LoginForm/LoginForm";
import "../global.css";

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default async function page() {
  return (
    <FormPage>
      <LoginForm />
    </FormPage>
  );
}
