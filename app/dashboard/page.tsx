import SignOutButton from "@Components/SignOutButton";
import TaskTypeChart from "@Components/TaskTypeChart";
import { authOptions } from "@Lib/authOptions";
import { createApiUrl } from "@Lib/createApiUrl";
import { Prisma } from "@prisma/client";
import { ChartData } from "@Utils/createDashboardChartsData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getDashboardData = async (userId: string) => {
  try {
    const res = await fetch(await createApiUrl("dashboard", { userId }), {
      method: "GET",
    });
    const { chartData } = (await res.json()) as { chartData: ChartData[] };
    return chartData;
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
        <h2 className="my-5 text-lg font-semibold tracking-wide sm:my-10 sm:text-xl">
          Witaj, {name}!
        </h2>
        <SignOutButton />
      </header>
      <section className="grid grid-cols-2 gap-1 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <span className="col-span-2 text-base tracking-wider sm:text-lg sm:col-span-3 md:col-span-4 lg:col-span-5">
          Twoje dotychczasowe postępy!
        </span>
        {chartsData.map((data) => (
          <TaskTypeChart key={data.id} {...data} />
        ))}
      </section>
    </>
  );
}
