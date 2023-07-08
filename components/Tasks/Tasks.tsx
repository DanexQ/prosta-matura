import React from "react";
import Task from "../Task";
import PageNav from "../TasksPageNav";
import { TasksDetailsType } from "@app/tasks/page";

const Tasks = ({ tasks, tasksQuantity }: TasksDetailsType) => {
  const pagesQuantity = Math.ceil(tasksQuantity / 5);

  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      {tasks.map((task) => (
        <Task key={task.taskId} {...task} />
      ))}
      <PageNav quantity={pagesQuantity} />
    </section>
  );
};

export default Tasks;
