"use client";
import React from "react";
import Task from "./Tasks/Task";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskProps } from "./types";
import { taskTypes } from "./Tasks/TaskTypes";

const NewTaskForm = () => {
  const defaultTask: TaskProps = {
    content: "",
    answer: "",
    taskType: "Stereometria",
    formula: "Nowa",
    examType: "Oficjalna",
    examYear: 2023,
    points: 0,
  };
  const { register, handleSubmit, watch } = useForm<TaskProps>({
    defaultValues: defaultTask,
  });
  const watchAllFields = watch();
  const onSubmit: SubmitHandler<TaskProps> = (task) => {
    console.log(task);
  };

  return (
    <div className="grid grid-cols-[3fr_2fr] items-stretch gap-10">
      <Task {...watchAllFields} />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className=" w-full flex flex-col gap-3 [&>*:not(button)]:text-neutral-200 "
      >
        <h2 className="col-span-3 py-5 text-3xl font-bold text-center uppercase text-neutral-200">
          Dodaj Zadanie
        </h2>
        <label htmlFor="content" className="col-span-3 mx-2 text-sm">
          Treść
        </label>
        <textarea
          {...register("content")}
          className="col-span-3 p-2 mb-3 border bg-neutral-800 border-neutral-600"
        />
        <label htmlFor="answer" className="col-span-3 mx-2 text-sm">
          Odpowiedź
        </label>
        <textarea
          {...register("answer")}
          className="col-span-3 p-2 mb-3 border bg-neutral-800 border-neutral-600"
        />
        <div className="grid items-center grid-cols-2 col-span-3 grid-rows-2 row-span-2 px-2 mb-3 justify-items-center ">
          <label htmlFor="taskType text-sm">Typ zadania</label>{" "}
          <select
            {...register("taskType")}
            className="row-start-2 col-end-2 text-center border bg-neutral-800 border-neutral-600 max-w-[max-content] p-1"
          >
            {taskTypes.map((taskType) => (
              <option key={taskType} value={taskType}>
                {taskType}
              </option>
            ))}
          </select>
          <label htmlFor="points" className="col-start-2 row-start-1 text-sm">
            Punktacja
          </label>
          <input
            {...register("points", { max: 7, min: 1 })}
            type="number"
            className="text-center border bg-neutral-800 border-neutral-600 max-w-[50px] p-1"
          />
        </div>
        <div className="grid items-center grid-cols-3 col-span-3 grid-rows-2 row-span-2 px-2 mb-3 justify-items-center">
          <label htmlFor="examType" className="text-sm">
            Rodzaj matury
          </label>
          <select
            {...register("examType")}
            className="col-start-1 col-end-2 row-start-2 p-1 text-center border bg-neutral-800 border-neutral-600"
          >
            <option value="Oficjalna">Oficjalna</option>
            <option value="Dodatkowa">Dodatkowa</option>
            <option value="Próbna">Próbna</option>
          </select>
          <label className="text-sm">Formuła</label>
          <div className="[&>label]:text-neutral-200 flex gap-2 col-start-2 row-start-2">
            <label
              htmlFor="Stara"
              className={`px-2 py-1 border border-neutral-600 cursor-pointer bg-neutral-800 ${
                watchAllFields.formula === "Stara" && "bg-neutral-600"
              }`}
            >
              <input
                type="radio"
                {...register("formula")}
                value="Stara"
                id="Stara"
                className="hidden"
              />
              Stara
            </label>
            <label
              htmlFor="Nowa"
              className={`px-2 py-1 border border-neutral-600 cursor-pointer bg-neutral-800 ${
                watchAllFields.formula === "Nowa" && "bg-neutral-600"
              }`}
            >
              <input
                type="radio"
                {...register("formula")}
                value="Nowa"
                id="Nowa"
                className="hidden"
              />
              Nowa
            </label>
          </div>
          <label htmlFor="examYear" className="text-sm ">
            Rok
          </label>
          <input
            {...register("examYear", { max: 2023, min: 2015 })}
            type="number"
            className="w-[100px] text-center border bg-neutral-800 border-neutral-600 p-1"
          />
        </div>
        <input type="file" {...register("imageUrl")} />
        <button type="submit" className="self-center w-1/2 group btn-primary">
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
