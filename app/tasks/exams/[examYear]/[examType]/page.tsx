import Tasks from "@components/Tasks/Tasks";
import { getExamTasks } from "@firebase/getExamTasks";

export default async function Page({
  params,
}: {
  params: { examYear: number; examType: string };
}) {
  const tasks = await getExamTasks(params);
  console.log(tasks);
  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasks} />
    </section>
  );
}
