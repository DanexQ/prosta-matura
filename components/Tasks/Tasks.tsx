import React from "react";
import Task from "./Task";
import PageNav from "./PageNav";
import { TasksDetailsType } from "@app/page";

const Tasks = ({ tasks, tasksQuantity }: TasksDetailsType) => {
  const pagesQuantity = Math.ceil(tasksQuantity / 5);

  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-100 flex-[3_2_0%]">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}

      <PageNav quantity={pagesQuantity} />
    </section>
  );
};

export default Tasks;
