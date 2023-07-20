"use client";
import { TaskItem } from "@customTypes/taskTypes";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";
import TaskCompletedButton from "./TaskCompletedButton";
import { changeTaskCompletition } from "@serverActions/changeTaskCompletition";
import { Prisma } from "@prisma/client";
import { MathJax } from "better-react-mathjax";

const Task = (details: TaskItem) => {
  const [isCompleted, setIsCompleted] = useState(details.isCompleted);
  const { data: session } = useSession();
  const router = useRouter();
  const borderStyling = isCompleted ? "border-green-600" : "border-neutral-600";

  const handleChangeTaskCompletition = async () => {
    if (!session) return router.replace("/auth/signin");
    try {
      const test = await changeTaskCompletition({
        id: details.id,
        isCompleted,
        userId: session.user.id,
      });
      console.log(test);
      setIsCompleted((prev) => !prev);
    } catch (err) {
      const error = err as Prisma.PrismaClientKnownRequestError;
      throw new Error(error.code);
    }
  };

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
    >
      <TaskTags labels={createTagLabels(details)} />
      <MathJax>
        <TaskContent content={details.content} imageUrl={details.imageUrl} />
        <TaskAnswer answer={details.answer}>
          <TaskCompletedButton
            isCompleted={isCompleted}
            handleClick={handleChangeTaskCompletition}
          />
        </TaskAnswer>
      </MathJax>
    </div>
  );
};

export default Task;
