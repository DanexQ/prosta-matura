import RandomTask from "@components/RandomTask";
import { getFilteredTasks } from "@lib/getTasks";
import { Prisma } from "@prisma/client";

export const metadata = {
  title: "Losowe zadanie | Prosta Matura",
};

const getRandomTask = async () => {
  try {
    const tasks = await getFilteredTasks({ OR: undefined });
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
