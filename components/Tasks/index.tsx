"use client";
import React from "react";
import TasksPagination from "../TasksPagination";
import { TaskItem } from "@CustomTypes/taskTypes";
import { MathJaxContext } from "better-react-mathjax";
import Task from "@Components/Task";

const config = {
  loader: { load: ["input/asciimath"] },
};

export type TasksProps = {
  tasks: TaskItem[];
  tasksQuantity?: number;
};

const Tasks = ({ tasks, tasksQuantity }: TasksProps) => {
  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      <MathJaxContext config={config}>
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </MathJaxContext>

      {!!tasksQuantity && (
        <TasksPagination quantity={Math.ceil(tasksQuantity / 5)} />
      )}
    </section>
  );
};

export default Tasks;
