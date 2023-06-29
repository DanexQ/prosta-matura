import FormPage from "@components/FormPage";
import LoginForm from "@components/FormLogin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/authOptions";

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) return redirect("/tasks");
  return (
    <FormPage>
      <LoginForm />
    </FormPage>
  );
}
