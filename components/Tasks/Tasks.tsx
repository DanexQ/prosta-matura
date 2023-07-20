"use client";
import React from "react";
import PageNav from "../TasksPageNav";
import { TaskItem } from "@customTypes/taskTypes";
import { MathJaxContext } from "better-react-mathjax";
import Task from "@components/Task";

const config = {
  loader: { load: ["input/asciimath"] },
};

interface ITasks {
  tasks: TaskItem[];
  tasksQuantity?: number;
}

const Tasks = ({ tasks, tasksQuantity }: ITasks) => {
  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      <MathJaxContext config={config}>
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </MathJaxContext>

      {!!tasksQuantity && <PageNav quantity={Math.ceil(tasksQuantity / 5)} />}
    </section>
  );
};

export default Tasks;
