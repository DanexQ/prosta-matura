"use client";
import React from "react";

const TaskTag = ({
  color = "bg-neutral-500/50 text-neutral-200",
  tag,
}: {
  color?: string;
  tag: string;
}) => {
  return <div className={color}>{tag}</div>;
};

export default TaskTag;
