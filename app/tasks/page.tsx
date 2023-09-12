import React, { cache } from "react";
import FiltersForm from "@Components/Filters";
import dynamicRender from "next/dynamic";
import { getFilteredTasks } from "@Lib/getFilteredTasks";
import { Prisma } from "@prisma/client";
import { getTaskTypes } from "@Lib/getTaskTypes";
import TasksLoader from "@Components/TasksLoader";
import { taskTypeData } from "@CustomTypes/taskTypes";

export type SearchParams = {
  taskTypes?: string | undefined;
  page: number | undefined;
};

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const [taskTypes, page] = [
    searchParams.taskTypes ?? "",
    searchParams.page ?? "1",
  ];
  const title = !!taskTypes
    ? taskTypes
        .split(" ")
        .map(
          (taskTypes) => taskTypeData[taskTypes as keyof typeof taskTypeData]
        )
        .join(" ")
    : "Zadania";
  return {
    title: `${title} | ${page + " | "}Prosta Matura`,
  };
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
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const Tasks = dynamicRender(
    () => import("../../components/Tasks").then((T) => T.default),
    { loading: () => <TasksLoader /> }
  );
  const [tasksDetails, taskTypes] = await Promise.all([
    getTasks(searchParams.taskTypes, searchParams.page),
    getTaskTypes(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-2 md:gap-5 md:flex-row md:text-base animate-fadeIn">
      <Tasks {...tasksDetails} />
      <FiltersForm filters={taskTypes} />
    </section>
  );
}
