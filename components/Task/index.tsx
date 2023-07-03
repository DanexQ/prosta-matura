"use client";
import tagColor from "@utils/tagColor";
import TaskTag from "./TaskTag";
import { TaskListItem } from "../types";
import TaskAnswer from "./TaskAnswer";
import { taskTypeList } from "../Tasks/taskTypes";
import TaskContent from "./TaskContent";
import { useState } from "react";
import { markTaskAsDone } from "@firebase/markTaskAsDone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskDoneButton from "./TaskDoneButton";

const Task = (details: TaskListItem) => {
  const [isCompleted, setIsCompleted] = useState(details.isCompleted);
  const { data: session } = useSession();
  const router = useRouter();

  const formula = `${details.formula} Formuła`;
  const exam = `Matura ${details.examType} ${details.examYear}`;
  const points = `Punkty: 0-${details.points} [${Math.floor(
    (details.points / 50) * 100
  )}%]`;
  const taskType = taskTypeList[details.taskType];

  const handleChangeCompletition = async () => {
    // @ts-ignore
    const { id: userId } = session?.user;

    try {
      if (!!userId) {
        await markTaskAsDone(userId, details.id, details.isCompleted);
        setIsCompleted((prev) => !prev);
      } else {
        router.push("/auth/signin");
      }
    } catch (err) {
      alert(err);
    }
  };

  const borderStyling = isCompleted ? "border-green-600" : "border-neutral-600";

  return (
    <div
      className={`flex flex-col p-4 border lg:p-8 ${borderStyling} text-inherit`}
    >
      <div className="flex gap-2 font-semibold md:tracking-wider items-center [&>div]:py-[0.5px] [&>div]:px-1 [&>div]:md:py-1 [&>div]:md:px-2 text-[10px]">
        <TaskTag>{exam}</TaskTag>
        <TaskTag color={tagColor(details.formula)}>{formula}</TaskTag>
        <TaskTag color={tagColor(taskType)}>{taskType}</TaskTag>
        <span className="ml-auto text-xs">{points}</span>
      </div>
      <TaskContent content={details.content} />
      <TaskAnswer answer={details.answer}>
        <TaskDoneButton
          isCompleted={isCompleted}
          handleClick={handleChangeCompletition}
        />
      </TaskAnswer>
    </div>
  );
};

export default Task;
