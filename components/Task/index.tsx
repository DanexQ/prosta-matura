"use client";
import { TaskItem } from "@CustomTypes/taskTypes";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";
import TaskCompletedButton from "./TaskCompletedButton";
import { changeTaskCompletition } from "@ServerActions/changeTaskCompletition";
import { Prisma } from "@prisma/client";
import { MathJax } from "better-react-mathjax";
import { taskStatusStyling } from "@Utils/taskStatusStyling";

const Task = (details: TaskItem) => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [taskStatus, setTaskStatus] = useState({
    loading: false,
    isCompleted: details.isCompleted,
  });

  const borderStyling = useMemo(() => {
    return taskStatusStyling(taskStatus, {
      pending: "border-orange-500",
      completed: "border-green-600",
      neutral: "border-neutral-600",
    });
  }, [taskStatus]);

  const handleChangeTaskCompletition = async () => {
    if (!session) return router.push("/auth/signin");
    setTaskStatus((prevState) => ({ ...prevState, loading: true }));
    try {
      await changeTaskCompletition({
        id: details.id,
        isCompleted: details.isCompleted,
        userId: session.user.id,
        taskTypes: searchParams.get("taskTypes"),
        page: searchParams.get("page"),
      });
      setTaskStatus((prevState) => ({
        ...prevState,
        isCompleted: !prevState.isCompleted,
      }));
    } catch (err) {
      const error = err as Prisma.PrismaClientKnownRequestError;
      throw new Error(error.code);
    } finally {
      setTaskStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
      data-testid="test-task"
    >
      <TaskTags labels={createTagLabels(details)} />
      <MathJax>
        <TaskContent content={details.content} imageUrl={details.imageUrl} />
        <TaskAnswer answer={details.answer}>
          <TaskCompletedButton
            taskStatus={taskStatus}
            handleClick={handleChangeTaskCompletition}
          />
        </TaskAnswer>
      </MathJax>
    </div>
  );
};

export default Task;
