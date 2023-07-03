"use client";
import { TaskListItem } from "../types";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useState } from "react";
import { markTaskAsDone } from "@firebase/markTaskAsDone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskDoneButton from "./TaskDoneButton";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";

const Task = (details: TaskListItem) => {
  const [isCompleted, setIsCompleted] = useState(details.isCompleted);
  const { data: session } = useSession();
  const router = useRouter();
  const borderStyling = isCompleted ? "border-green-600" : "border-neutral-600";

  const handleChangeTaskCompletition = async () => {
    // @ts-ignore
    const userId = session?.user?.id;
    try {
      if (!!userId) {
        await markTaskAsDone(userId, isCompleted, {
          taskId: details.taskId,
          taskType: details.taskType,
        });
        setIsCompleted((prev) => !prev);
      } else {
        router.push("/auth/signin");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
    >
      <TaskTags labels={createTagLabels(details)} />
      <TaskContent content={details.content} />
      <TaskAnswer answer={details.answer}>
        <TaskDoneButton
          isCompleted={isCompleted}
          handleClick={handleChangeTaskCompletition}
        />
      </TaskAnswer>
    </div>
  );
};

export default Task;
