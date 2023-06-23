import FormPage from "@components/FormPage";
import LoginForm from "@components/FormLogin";
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
