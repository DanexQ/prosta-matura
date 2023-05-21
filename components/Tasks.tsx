"use client";
import { TaskList } from "@app/page";
import React, { useEffect, useState } from "react";
import Task from "./Task/Task";
import TaskFilter, { FilterType } from "./TaskFilter";

const Tasks = ({
  getTasks,
  filters,
}: {
  getTasks: (string: string) => Promise<TaskList[]>;
  filters: FilterType[];
}) => {
  const [tasks, setTasks] = useState<TaskList[]>([]);
  useEffect(() => {
    getTasks("").then((tasks) => setTasks(tasks));
  }, [getTasks]);

  const fetchFilteredData = async (query: string) => {
    const data = await getTasks(query);
    console.log(query);
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
