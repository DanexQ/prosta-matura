import React from "react";
import TaskTag from "./TaskTag";
import tagColor from "@utils/tagColor";

interface TaskTags {
  labels: { [x: string]: string };
}

const TaskTags = ({ labels }: TaskTags) => {
  return (
    <div className="flex gap-2 font-semibold md:tracking-wider items-center [&>div]:py-[0.5px] [&>div]:px-1 [&>div]:md:py-1 [&>div]:md:px-2 text-[10px]">
      <TaskTag>{labels.examLabel}</TaskTag>
      <TaskTag color={tagColor(labels.formula)}>{labels.formulaLabel}</TaskTag>
      <TaskTag color={tagColor(labels.typeLabel)}>{labels.typeLabel}</TaskTag>
      <span className="ml-auto text-xs">{labels.pointsLabel}</span>
    </div>
  );
};

export default TaskTags;
