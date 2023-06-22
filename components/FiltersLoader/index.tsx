import React from "react";

const FiltersLoader = () => {
  return (
    <section
      className={`flex flex-col self-start p-4 gap-2 text-gray-100 border md:flex-[1_1_0%] border-neutral-600 w-full`}
    >
      <div className="flex justify-between gap-2 mb-3">
        <div className="w-[30%] task-content-loader"></div>
        <div className="w-[50%] task-content-loader"></div>
      </div>
      {new Array(15).fill(0).map((i) => (
        <div key={i} className="task-content-loader"></div>
      ))}
      <div className="w-full mt-3 task-button-loader"></div>
    </section>
  );
};

export default FiltersLoader;
