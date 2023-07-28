import SignOutButton from "@components/SignOutButton";
import TaskTypeChart from "@components/TaskTypeChart";
import { authOptions, prisma } from "@lib/authOptions";
import { getTaskTypes } from "@lib/getTaskTypes";
import { Prisma } from "@prisma/client";
import { createDashboardChartsData } from "@utils/createDashboardChartsData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const getDashboardData = async (userId: string) => {
  try {
    const completedTasks = await prisma.completedTask.findMany({
      where: { userId },
      include: { task: { select: { taskType: true } } },
    });
    const taskTypes = await getTaskTypes();
    const chartsData = createDashboardChartsData(completedTasks, taskTypes);
    return chartsData;
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/tasks");

  const { id, name } = session.user;
  const chartsData = await getDashboardData(id);

  return (
    <>
      <header className="flex items-center justify-between w-full">
        <h2 className="my-10 text-xl font-bold tracking-wide">
          Witaj, {name}!
        </h2>
        <SignOutButton />
      </header>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <span className="col-span-1 text-lg font-semibold tracking-wider uppercase sm:col-span-2 md:col-span-3 lg:col-span-4">
          Twoje dotychczasowe postępy!
        </span>
        {chartsData.map((data) => (
          <TaskTypeChart key={data.id} {...data} />
        ))}
      </section>
    </>
  );
}
