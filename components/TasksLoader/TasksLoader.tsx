import React from "react";

const LoadingTasks = () => {
  const loadingElements = new Array(5).fill(0).map((i) => (
    <div
      key={i}
      className="flex flex-col p-4 border lg:p-8 border-neutral-600 text-inherit"
    >
      <div className="flex gap-2 font-semibold md:tracking-wider items-center [&>div]:py-[0.5px] [&>div]:px-1 [&>div]:md:py-1 [&>div]:md:px-2 text-[10px]">
        <div className="task-tag-loader"></div>
        <div className="task-tag-loader"></div>
        <div className="task-tag-loader"></div>
        <div className="w-full h-6 bg-transparent"></div>
        <div className="task-tag-loader"></div>
      </div>
      <div className="flex flex-col w-full gap-2 my-2">
        <div className="task-content-loader"></div>
        <div className="task-content-loader"></div>
        <div className="task-content-loader"></div>
        <div className="task-content-loader"></div>
        <div className="task-button-loader"></div>
      </div>
    </div>
  ));
  return (
    <div className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      {loadingElements}
    </div>
  );
};

export default LoadingTasks;
