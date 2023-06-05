"use client";
import React, { use } from "react";
import Task from "./Task";
import PageNav from "./PageNav";
import { useSearchParams } from "next/navigation";
import { TasksDetailsType } from "@app/page";

const fetchData = async (query: string): Promise<TasksDetailsType> => {
  const res = fetch(`http://localhost:3000/api${query}`);
  const data = (await res).json();
  return data;
};

const Tasks = () => {
  const searchParams = useSearchParams();
  const query = "?" + searchParams.toString();
  const { tasks, tasksQuantity } = use(fetchData(query));
  return (
    <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}

      <PageNav quantity={Math.ceil(tasksQuantity / 5)} />
    </section>
  );
};

export default Tasks;
