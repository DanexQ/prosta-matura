import React from "react";
import FiltersForm from "@Components/Filters";
import dynamicRender from "next/dynamic";
import TasksLoader from "@Components/TasksLoader";
import { taskTypeData } from "@CustomTypes/taskTypes";
import { TasksProps } from "../../components/Tasks";
import { createApiUrl } from "@Lib/createApiUrl";
import { authOptions } from "@Lib/authOptions";
import { getServerSession } from "next-auth";

export type SearchParams = {
  taskTypes?: string | undefined;
  page: number | undefined;
};

type TasksPageProps = {
  searchParams: SearchParams;
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

const getTasks = async (searchParams: SearchParams): Promise<TasksProps> => {
  const session = await getServerSession(authOptions);
  const testResponse = await fetch(
    await createApiUrl("tasks", { searchParams, userId: session?.user.id }),
    {
      method: "GET",
    }
  );
  const data = (await testResponse.json()) as TasksProps;
  return data;
};

const getTaskTypes = async () => {
  const res = await fetch(await createApiUrl("taskTypes"), { method: "GET" });
  const { taskTypes } = await res.json();
  return taskTypes;
};

export default async function Page({ searchParams }: TasksPageProps) {
  const Tasks = dynamicRender(
    () => import("../../components/Tasks").then((T) => T.default),
    { loading: () => <TasksLoader /> }
  );
  const [tasksDetails, taskTypes] = await Promise.all([
    await getTasks(searchParams),
    await getTaskTypes(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-2 md:gap-5 md:flex-row md:text-base animate-fadeIn">
      <Tasks {...tasksDetails} />
      <FiltersForm filters={taskTypes} />
    </section>
  );
}
