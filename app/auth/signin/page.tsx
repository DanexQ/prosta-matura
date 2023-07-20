import FormPage from "@components/FormPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { redirect } from "next/navigation";
import SignInButton from "@components/SignInButton";

export const metadata = {
  title: "Logowanie | Prosta Matura",
};

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/tasks");

  return (
    <FormPage>
      <h2 className="text-2xl font-semibold tracking-wide uppercase">
        LOGOWANIE
      </h2>
      <SignInButton />
    </FormPage>
  );
}
