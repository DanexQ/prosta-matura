"use client";
import React from "react";

const TaskTag = ({
  color = "bg-neutral-500/50 text-neutral-200",
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) => {
  return <div className={color}>{children}</div>;
};

export default TaskTag;
