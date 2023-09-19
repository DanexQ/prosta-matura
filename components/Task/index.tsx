"use client";
import { TaskItem } from "@CustomTypes/taskTypes";
import TaskAnswer from "./TaskAnswer";
import TaskContent from "./TaskContent";
import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTagLabels } from "./createTagLabels";
import TaskTags from "./TaskTags";
import TaskCompletedButton from "./TaskCompletedButton";
import { Prisma } from "@prisma/client";
import { MathJax } from "better-react-mathjax";
import { taskStatusStyling } from "@Utils/taskStatusStyling";
import { createApiUrl } from "@Lib/createApiUrl";
import { revPath } from "@Lib/revPath";

const Task = (details: TaskItem) => {
  const { data: session } = useSession();
  const router = useRouter();
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

  const handleChangeTaskCompletition = useCallback(async () => {
    if (!session) return router.push("/auth/signin");
    setTaskStatus((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(await createApiUrl("completedTasks"), {
        method: taskStatus.isCompleted ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: details.id,
          userId: session.user.id,
        }),
      });
      setTaskStatus((prevState) => ({
        ...prevState,
        isCompleted: !prevState.isCompleted,
      }));
    } catch (err) {
      const error = err as Prisma.PrismaClientKnownRequestError;
      throw new Error(error.message);
    } finally {
      revPath("/tasks");
      setTaskStatus((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, [taskStatus.isCompleted, session, details.id, router]);

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
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
