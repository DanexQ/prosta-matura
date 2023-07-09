"use client";
import Button from "@components/Button";
import Task from "@components/Task";
import { TaskListItem } from "@customTypes/taskTypes";
import { useRouter } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Losowe zadanie | Prosta Matura",
};

const RandomTask = (details: TaskListItem) => {
  const router = useRouter();
  const handleClick = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <Task {...details} />
      <Button
        handleClick={handleClick}
        styling="px-5 py-2 self-center font-semibold text-lg"
      >
        Losuj kolejne zadanie
      </Button>
      {/* <button
        className="self-center px-5 py-2 uppercase btn-primary"
        onClick={handleClick()}
      >
        Losuj kolejne zadanie
      </button> */}
    </div>
  );
};

export default RandomTask;
