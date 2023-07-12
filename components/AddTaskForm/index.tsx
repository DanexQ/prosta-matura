"use client";
import React, { useState } from "react";
import Task from "../Task";
import { useForm, SubmitHandler } from "react-hook-form";
import { addTask } from "@firebase/addTask";
import { Task as TaskT, taskTypeData } from "@customTypes/taskTypes";

const defaultTask: TaskT = {
  taskId: "",
  content: "",
  answer: "",
  taskType: "stereometria",
  formula: "nowa",
  examType: "oficjalna",
  examYear: 2023,
  points: 0,
  taskNumber: 1,
};

const AddTaskForm = () => {
  const { register, handleSubmit, watch } = useForm<TaskT>({
    defaultValues: defaultTask,
  });
  const [uploadedImage, setUploadedImage] = useState<File | undefined>(
    undefined
  );
  const watchAllFields = watch();
  const [sentTask, setSentTask] = useState<TaskT>();

  const onSubmit: SubmitHandler<TaskT> = async (task) => {
    try {
      const sTask = await addTask(task, uploadedImage);
      setSentTask(sTask);
    } catch (err) {
      const error = err as Error;
      throw new Error(
        `AddTaskForm > onSubmit Error - ${error.message}, ${error.name}`
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-[3fr_2fr] items-stretch gap-3">
        <Task {...watchAllFields} />
        {/* 
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-3 [&>*:not(button)]:text-neutral-200 border border-neutral-600 p-3"
        > */}
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-3 [&>*:not(button)]:text-neutral-200 border border-neutral-600 p-3"
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

          <div className="grid items-center grid-cols-[2fr_1fr_1fr] col-span-3 grid-rows-2 row-span-2 px-2 mb-3 justify-items-center ">
            <label htmlFor="taskType " className="text-sm">
              Typ zadania
            </label>
            <select
              {...register("taskType")}
              className="row-start-2 col-end-2 text-center border bg-neutral-800 border-neutral-600 max-w-[max-content] p-1"
            >
              {Object.entries(taskTypeData).map(([id, type]) => (
                <option key={id} value={id}>
                  {type}
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
            <label
              htmlFor="taskNumber"
              className="col-start-3 row-start-1 text-sm"
            >
              Numer
            </label>
            <input
              {...register("taskNumber", { max: 15, min: 1 })}
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
                className={`px-2 py-1 border border-neutral-600 cursor-pointer ${
                  watchAllFields.formula === "stara"
                    ? "bg-neutral-600"
                    : "bg-neutral-800"
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
                className={`px-2 py-1 border border-neutral-600 cursor-pointer  ${
                  watchAllFields.formula === "nowa"
                    ? "bg-neutral-600"
                    : "bg-neutral-800"
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
          <input
            type="file"
            onChange={(e) => setUploadedImage(e.target.files![0])}
          />
          {/* disabled for prod */}
          <button
            type="submit"
            className="self-center w-1/2 group btn-primary"
            disabled
          >
            Dodaj
          </button>
        </form>
      </div>
      <p>
        {[sentTask?.taskId as string] + ":" + JSON.stringify(sentTask, null, 2)}
      </p>
    </>
  );
};

export default AddTaskForm;
