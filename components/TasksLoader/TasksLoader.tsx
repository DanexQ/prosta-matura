import TaskLoader from "@/components/TaskLoader";
import React from "react";

const LoadingTasks = () => {
  const loadingElements = [1, 2, 3, 4, 5].map((i) => <TaskLoader key={i} />);
  return (
    <div className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      {loadingElements}
    </div>
  );
};

export default LoadingTasks;
