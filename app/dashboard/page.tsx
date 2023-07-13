import ButtonLogOut from "@components/ButtonLogOut";
import TaskChart from "@components/TaskTypeChart";
import { getFilters } from "@firebase/getFilters";
import { getUsersCompletedTasks } from "@firebase/getUsersCompletedTasks";
import { authOptions } from "@lib/authOptions";
import { createDashboardChartsData } from "@utils/createDashboardChartsData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!!!userId) return redirect("/tasks");

  const [completedTasks, types] = await Promise.all([
    getUsersCompletedTasks(userId),
    getFilters(),
  ]);
  const chartsData = createDashboardChartsData(completedTasks, types);

  return (
    <>
      <section className="flex items-center justify-between w-full p-8">
        <h2 className="text-xl font-bold tracking-wide">
          Witaj, {session?.user?.name}!
        </h2>
        <ButtonLogOut />
      </section>
      <section className="grid grid-cols-1 gap-3 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <span className="col-span-1 text-lg font-semibold tracking-wider uppercase sm:col-span-2 md:col-span-3 lg:col-span-4">
          Twoje dotychczasowe postępy!
        </span>
        {chartsData.map((data) => (
          <TaskChart key={data.id} {...data} />
        ))}
      </section>
    </>
  );
}
