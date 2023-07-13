import FormPage from "@components/FormPage";
import LoginForm from "@components/FormLogin";

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default function page() {
  return (
    <FormPage>
      <LoginForm redirectTo="/tasks" />
    </FormPage>
  );
}
