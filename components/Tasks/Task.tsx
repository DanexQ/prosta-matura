"use client";
import tagColor from "@utils/tagColor";
// @ts-ignore
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TaskTag from "./TaskTag";
import Image from "next/image";
import { TaskListItem } from "../types";
import TaskAnswer from "./TaskAnswer";
import { taskTypeList } from "./taskTypes";

const Task = (details: Omit<TaskListItem, "id">) => {
  const formula = `${details.formula} Formuła`;
  const exam = `Matura ${details.examType} ${details.examYear}`;
  const points = `Punkty: 0-${details.points} [${Math.floor(
    (details.points / 50) * 100
  )}%]`;
  const taskType = taskTypeList[details.taskType];

  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <div className="flex flex-col p-4 border lg:p-8 border-neutral-600 text-neutral-200">
      <div className="flex gap-2 font-semibold tracking-wider items-center [&>div]:py-1 [&>div]:px-2 text-xs">
        <TaskTag>{exam}</TaskTag>
        <TaskTag color={tagColor(details.formula)}>{formula}</TaskTag>
        <TaskTag color={tagColor(taskType)}>{taskType}</TaskTag>
        <span className="ml-auto text-neutral-200">{points}</span>
      </div>
      <MathJaxContext config={config}>
        <p className="my-5 font-thin whitespace-pre-line">
          <MathJax>{details.content.replaceAll("/n", "\n")}</MathJax>
          {/*
          TODO: MAKE ALL IMAGES IMAGES AND NOT SVG
          {!!details.imageUrl && (
            <Image
              src={details.imageUrl}
              alt="TaskImage"
              width={300}
              height={300}
            />
          )} */}
        </p>
        <TaskAnswer answer={details.answer} />
      </MathJaxContext>
    </div>
  );
};

export default Task;
