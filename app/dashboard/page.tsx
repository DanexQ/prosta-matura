import TaskChart from "@components/TaskChart";
import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <section className="flex items-center justify-between w-full p-8">
        <h2 className="text-xl font-bold tracking-wide">
          Witaj, {session?.user?.name}!
        </h2>
        <button className="p-2 font-bold uppercase btn-primary bg-red-500/60 hover:bg-red-600/80 after:bg-red-500">
          Wyloguj się
        </button>
      </section>
      <section className="grid justify-between grid-cols-5 gap-3 p-8 border border-neutral-600 ">
        <span className="col-span-5 text-lg font-semibold tracking-wider uppercase">
          Twoje dotychczasowe postępy!
        </span>
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
        <TaskChart />
      </section>
    </>
  );
}
