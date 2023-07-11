import RandomTask from "@components/RandomTask";
import { getRandomTask } from "@firebase/getRandomTask";
import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const task = await getRandomTask(session?.user?.id);

  return <RandomTask {...task} />;
}
