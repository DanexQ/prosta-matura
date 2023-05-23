"use client";
import { TaskList } from "@app/page";
import React, { useState } from "react";
import Task from "./Task/Task";
import TaskFilter, { FilterType } from "./TaskFilter";

const Tasks = ({
  getTasks,
  filters,
  initialTasks,
}: {
  getTasks: (string: string) => Promise<TaskList[]>;
  filters: FilterType[];
  initialTasks: TaskList[];
}) => {
  const [tasks, setTasks] = useState<TaskList[]>(initialTasks);

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    setTasks(data);
  };

  return (
    <>
      <section className="text-gray-100 flex-[3_1_0%] flex flex-col gap-5">
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </section>
      <TaskFilter filterTypes={filters} fetchFilteredData={fetchFilteredData} />
    </>
  );
};

export default Tasks;
