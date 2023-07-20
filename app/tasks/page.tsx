import React, { cache } from "react";
import FiltersForm from "@components/Filters";
import dynamic from "next/dynamic";
import { getFilteredTasks } from "@lib/getTasks";
import { Prisma } from "@prisma/client";
import { getTaskTypes } from "@lib/getTaskTypes";

export const metadata = {
  title: "Zadania | Prosta Matura",
};

export type SearchParams = {
  taskTypes?: string | undefined;
  page: number | undefined;
};

const getTasks = cache(
  async (taskTypes: string | undefined, page: number = 1) => {
    try {
      const filters = taskTypes?.split(" ").map((taskType) => ({ taskType }));
      const tasks = await getFilteredTasks({ OR: filters });
      return {
        tasks: tasks.slice((page - 1) * 5, page * 5),
        tasksQuantity: tasks.length,
      };
    } catch (e) {
      const err = e as Prisma.PrismaClientKnownRequestError;
      throw new Error(err.message);
    }
  }
);

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const Tasks = dynamic(() =>
    import("../../components/Tasks/Tasks").then((T) => T.default)
  );
  const [tasksDetails, taskTypes] = await Promise.all([
    getTasks(searchParams.taskTypes, searchParams.page),
    getTaskTypes(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filters={taskTypes} />
    </section>
  );
}
