"use client";
import Button from "@components/Button";
import Task from "@components/Task";
import { TaskItem } from "@customTypes/taskTypes";
import { MathJaxContext } from "better-react-mathjax";
import { useRouter } from "next/navigation";
import React from "react";

const config = {
  loader: { load: ["input/asciimath"] },
};

const RandomTask = (details: TaskItem) => {
  const router = useRouter();
  const handleClick = () => {
    return router.refresh();
  };

  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <MathJaxContext config={config}>
        <Task {...details} />
      </MathJaxContext>
      <Button
        handleClick={handleClick}
        styling="px-5 py-2 self-center font-semibold text-lg"
      >
        Losuj kolejne zadanie
      </Button>
    </div>
  );
};

export default RandomTask;
