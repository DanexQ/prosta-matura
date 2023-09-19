import React from "react";

const TaskTag = ({
  color = "bg-neutral-500/50 text-neutral-200",
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${color} w-[30px] h-[10px] text-[0px] md:w-auto md:h-auto md:text-xs overflow-hidden md:text-center md:self-stretch md:flex md:items-center`}
    >
      {children}
    </div>
  );
};

export default TaskTag;
