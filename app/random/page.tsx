import RandomTask from "@components/RandomTask";
import { getRandomTask } from "@firebase/getRandomTask";
import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Losowe zadanie | Prosta Matura",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const task = await getRandomTask(userId);

  return <RandomTask {...task} />;
}
