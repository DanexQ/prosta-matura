"use client";
import React from "react";
import Task from "./Task";
import PageNav from "./PageNav";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { TasksDetailsType } from "@app/page";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Tasks = () => {
  const searchParams = useSearchParams();
  const query = "?" + searchParams.toString();
  const { data, error } = useSWR<TasksDetailsType, Error>(
    `/api${query}`,
    fetcher
  );
  console.log(data?.tasks, data?.tasksQuantity);
  return (
    <section className="flex flex-col gap-5 text-gray-100 flex-[3_2_0%]">
      {data?.tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}

      <PageNav quantity={data?.tasksQuantity || 1} />
    </section>
  );
};

export default Tasks;
