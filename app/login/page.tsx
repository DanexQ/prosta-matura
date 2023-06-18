import FormPage from "@components/FormPage/FormPage";
import LoginForm from "@components/LoginForm/LoginForm";

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default function page() {
  return (
    <FormPage>
      <LoginForm />
    </FormPage>
  );
}
