"use client";
import React, { useState } from "react";
import Task from "./Task";
import TaskFilter from "./TaskFilter";
import { FilterType, TaskList } from "@components/types";

const Tasks = ({
  getTasks,
  filters,
  initialTasks,
}: {
  getTasks: (string: string) => Promise<TaskList>;
  filters: FilterType[];
  initialTasks: TaskList;
}) => {
  const [tasks, setTasks] = useState<TaskList>(initialTasks);

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    setTasks(data);
  };

  return (
    <>
      <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </section>
      <TaskFilter filterTypes={filters} fetchFilteredData={fetchFilteredData} />
    </>
  );
};

export default Tasks;
