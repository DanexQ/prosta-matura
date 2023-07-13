"use client";
import React from "react";
import Task from "../Task";
import PageNav from "../TasksPageNav";
import { TasksDetails } from "@customTypes/taskTypes";
import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/asciimath"] },
};

const Tasks = ({ tasks, tasksQuantity }: TasksDetails) => {
  const pagesQuantity = Math.ceil(tasksQuantity / 5);

  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      <MathJaxContext config={config}>
        {tasks.map((task) => (
          <Task key={task.taskId} {...task} />
        ))}
      </MathJaxContext>

      <PageNav quantity={pagesQuantity} />
    </section>
  );
};

export default Tasks;
