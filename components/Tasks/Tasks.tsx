"use client";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskFilter from "./TaskFilter";
import { FilterType, TaskList } from "@components/types";
import PageNav from "./PageNav";
import { usePathname, useSearchParams } from "next/navigation";
import { TasksDetailsType } from "@app/page";

interface TasksProps {
  getTasks: (string: string) => Promise<TasksDetailsType>;
  filters: FilterType[];
  initialTasks: TaskList;
  initialQuantity: number;
}

const Tasks = ({
  getTasks,
  filters,
  initialTasks,
  initialQuantity,
}: TasksProps) => {
  const [data, setData] = useState<TasksDetailsType>({
    tasks: initialTasks,
    tasksQuantity: initialQuantity,
  });
  console.log(data.tasks, data.tasksQuantity);
  const tasksElements = data.tasks.map((task) => (
    <Task key={task.id} {...task} />
  ));
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    const apiUrl = pathname + "?" + searchParams.toString();
    fetchFilteredData(apiUrl);
  }, [pathname, searchParams]);

  return (
    <div className="flex max-w-6xl gap-10 mx-auto">
      <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
        {tasksElements}
        <PageNav quantity={Math.ceil(data.tasksQuantity / 5)} />
      </section>
      <TaskFilter filterTypes={filters} />
    </div>
  );
};

export default Tasks;
