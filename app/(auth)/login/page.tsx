import FormPage from "@components/FormPage";
import LoginForm from "@components/FormLogin";
<<<<<<< Updated upstream
=======
import { getCurrentUser } from "@utils/getCurrentUser";
>>>>>>> Stashed changes

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default async function page() {
  const user = getCurrentUser();
  console.log(user);

  return (
    <FormPage>
      <LoginForm />
    </FormPage>
  );
}
