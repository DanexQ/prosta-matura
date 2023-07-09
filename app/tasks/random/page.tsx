import RandomTask from "@components/RandomTask";
import { getRandomTask } from "@firebase/getRandomTask";

export default async function Page() {
  const task = await getRandomTask();

  return <RandomTask {...task} />;
}
