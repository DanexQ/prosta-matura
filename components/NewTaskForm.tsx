"use client";
import React, { useState } from "react";
import { TaskProps } from "./Task/Task";
import { addTask } from "@firebase/addTask";
import { taskTypes } from "./TaskTypes";
import { useForm, SubmitHandler } from "react-hook-form";

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
    <div className="self-stretch">
      <h2 className="py-5 text-3xl font-bold text-center uppercase text-neutral-200">
        Dodaj Zadanie
      </h2>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data as TaskProps))}
        className="w-full grid justify-items-center grid-cols-[1fr_4fr] [&>label]:text-center items-center gap-5 [&>label]:text-neutral-200 [&>textarea]:bg-neutral-900 [&>textarea]:border [&>textarea]:border-neutral-600 [&>*]:p-1 [&>textarea]:text-neutral-200 [&>textarea]:justify-self-stretch [&>select]:text-center"
      >
        <label htmlFor="content">Treść:</label>
        <textarea {...register("content")} />
        <label htmlFor="answer">Odpowiedź:</label>
        <textarea {...register("answer")} />
        <label htmlFor="taskType">Typ zadania:</label>
        <select {...register("taskType")}>
          {taskTypes.map((taskType) => (
            <option key={taskType} value={taskType}>
              {taskType}
            </option>
          ))}
        </select>
        <label htmlFor="examType">Rodzaj matury:</label>
        <select {...register("examType")}>
          <option value="Oficjalna">Oficjalna</option>
          <option value="Dodatkowa">Dodatkowa</option>
          <option value="Próbna">Próbna</option>
        </select>
        <label htmlFor="points">Punktacja:</label>
        <input {...register("points", { max: 7, min: 1 })} type="number" />
        <label>Formuła</label>
        <div>
          <label htmlFor="formula">Stara</label>
          <input type="radio" {...register("formula")} value="Stara" />
          <label htmlFor="formula">Nowa</label>
          <input type="radio" {...register("formula")} value="Nowa" />
        </div>
        <label htmlFor="examYear">Rok:</label>
        <input
          {...register("examYear", { max: 2023, min: 2015 })}
          type="number"
        />
        <button type="submit" className="col-span-2 text-neutral-200">
          Prześlij zadanie
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
