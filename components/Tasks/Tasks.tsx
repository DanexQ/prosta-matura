"use client";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskFilter from "./TaskFilter";
import { FilterType, TaskList } from "@components/types";
import PageNav from "./PageNav";
import { usePathname, useSearchParams } from "next/navigation";

interface TasksProps {
  getTasks: (string: string) => Promise<TaskList>;
  filters: FilterType[];
  initialTasks: TaskList;
}

const Tasks = ({ getTasks, filters, initialTasks }: TasksProps) => {
  const [tasks, setTasks] = useState<TaskList>(initialTasks);
  const tasksElements = tasks.map((task) => <Task key={task.id} {...task} />);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    setTasks(data);
  };

  useEffect(() => {
    const apiUrl = pathname + "?" + searchParams.toString();
    fetchFilteredData(apiUrl);
  }, [pathname, searchParams]);

  return (
    <div className="flex max-w-6xl gap-10 mx-auto">
      <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
        {tasksElements}
        <PageNav quantity={Math.ceil(tasks.length / 5)} />
      </section>
      <TaskFilter filterTypes={filters} />
    </div>
  );
};

export default Tasks;
