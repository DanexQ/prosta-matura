import RandomTask from "@Components/RandomTask";
import { createApiUrl } from "@Lib/createApiUrl";
import { Prisma } from "@prisma/client";

export const metadata = {
  title: "Losowe zadanie | Prosta Matura",
};

const getRandomTask = async () => {
  try {
    const res = await fetch(await createApiUrl("tasks"));
    const { tasks } = await res.json();
    const randomNumber = Math.floor(Math.random() * tasks.length);
    return tasks[randomNumber];
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
};

export default async function Page() {
  const task = await getRandomTask();

  return <RandomTask {...task} />;
}
