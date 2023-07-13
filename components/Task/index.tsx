"use client";
import { TaskItem } from "@customTypes/taskTypes";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useEffect, useState } from "react";
import { markTaskAsDone } from "@firebase/markTaskAsDone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";
import TaskCompletedButton from "./TaskCompletedButton";

const Task = (details: TaskItem) => {
  const [isCompleted, setIsCompleted] = useState(details.isCompleted);
  const { data: session } = useSession();
  const router = useRouter();
  const borderStyling = isCompleted ? "border-green-600" : "border-neutral-600";

  const handleChangeTaskCompletition = async () => {
    const userId = session?.user?.id;
    if (userId === undefined) router.push("/auth/signin");
    try {
      await markTaskAsDone(userId, isCompleted, {
        taskId: details.taskId,
        taskType: details.taskType,
        examType: details.examType,
        examYear: details.examYear,
      });
      setIsCompleted((prev) => !prev);
    } catch (err) {
      throw new Error(`handleChangeTaskCompletition() Error`);
    }
  };

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
    >
      <TaskTags labels={createTagLabels(details)} />
      <TaskContent content={details.content} imageUrl={details.imageUrl} />
      <TaskAnswer answer={details.answer}>
        <TaskCompletedButton
          isCompleted={isCompleted}
          handleClick={handleChangeTaskCompletition}
        />
      </TaskAnswer>
    </div>
  );
};

export default Task;
