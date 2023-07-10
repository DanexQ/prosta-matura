"use client";
import { TaskListItem } from "@customTypes/taskTypes";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useState } from "react";
import { markTaskAsDone } from "@firebase/markTaskAsDone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";
import TaskCompletedButton from "./TaskCompletedButton";

const Task = (details: TaskListItem) => {
  const [isCompleted, setIsCompleted] = useState(details.isCompleted);
  const { data: session } = useSession();
  const router = useRouter();
  const borderStyling = isCompleted ? "border-green-600" : "border-neutral-600";
  console.log();
  const handleChangeTaskCompletition = async () => {
    const userId = session?.user?.id;
    try {
      if (!!userId) {
        await markTaskAsDone(userId, isCompleted, {
          taskId: details.taskId,
          taskType: details.taskType,
          examType: details.examType,
          examYear: details.examYear,
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
