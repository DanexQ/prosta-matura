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
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 p-10 border w-96 border-neutral-600">
        <h2 className="text-[40px] font-semibold tracking-wide uppercase">
          LOGOWANIE
        </h2>
        <h3 className="text-lg text-center">
          Zaloguj się na swoje konto i miej swoje obliczone zadania wszędzie!
        </h3>
        <SignInButton />
      </div>
    </div>
  );
}
