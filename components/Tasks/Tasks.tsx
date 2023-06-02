"use client";
import React, { useState } from "react";
import Task from "./Task";
import TaskFilter from "./TaskFilter";
import { FilterType, TaskList } from "@components/types";
import PageNav from "./PageNav";
import { useSearchParams } from "next/navigation";

interface TasksProps {
  getTasks: (string: string) => Promise<TaskList>;
  filters: FilterType[];
  initialTasks: TaskList;
  pagesQuantity: number;
}

const Tasks = ({
  getTasks,
  filters,
  initialTasks,
  pagesQuantity,
}: TasksProps) => {
  const [tasks, setTasks] = useState<TaskList>(initialTasks);
  const tasksElements = tasks.map((task) => <Task key={task.id} {...task} />);
  const searchParams = useSearchParams();

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    setTasks(data);
  };

  return (
    <>
      <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
        {tasksElements}
        <PageNav quantity={15} />
      </section>
      <TaskFilter filterTypes={filters} fetchFilteredData={fetchFilteredData} />
    </>
  );
};

export default Tasks;
