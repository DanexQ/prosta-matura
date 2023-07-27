"use client";
import React, { useState } from "react";
import Task from "../Task";
import { useForm } from "react-hook-form";
import { taskTypeData } from "@customTypes/taskTypes";
import { Prisma, Task as PrismaTask } from "@prisma/client";
import { addTask } from "@serverActions/addTask";
import { MathJaxContext } from "better-react-mathjax";
import ButtonUploader from "@components/ButtonUploader";

type DefaultTask = Omit<PrismaTask, "id">;

const defaultTask: Omit<PrismaTask, "id"> = {
  content: "",
  answer: "",
  taskType: "stereometria",
  formula: "nowa",
  examType: "oficjalna",
  examYear: 2023,
  points: 0,
  imageUrl: null,
  taskNumber: 1,
};

const AddTaskForm = () => {
  const { register, handleSubmit, watch } = useForm<DefaultTask>({
    defaultValues: defaultTask,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [sentTask, setSentTask] = useState<PrismaTask>();
  const watchAllFields = watch();

  const onSubmit = async (task: DefaultTask) => {
    try {
      const uploadedTask = await addTask({ ...task, imageUrl } as Omit<
        PrismaTask,
        "id"
      >);

      setSentTask(uploadedTask);
      alert("Task uploaded successfully");
    } catch (err) {
      const error = err as Prisma.PrismaClientKnownRequestError;
      throw new Error(
        `AddTaskForm > onSubmit Error - ${error.message}, ${error.name}`
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-[3fr_2fr] items-stretch gap-3">
        <MathJaxContext>
          <Task {...(watchAllFields as PrismaTask)} isCompleted={false} />
        </MathJaxContext>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
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
            <label htmlFor="taskType" className="text-sm">
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
              <option value="oficjalna">Oficjalna</option>
              <option value="dodatkowa">Dodatkowa</option>
              <option value="probna">Próbna</option>
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
                  value="stara"
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
                  value="nowa"
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
          {/* disabled for prod */}
          <ButtonUploader setImageUrl={setImageUrl} />
          <button type="submit" className="self-center w-1/2 group btn-primary">
            Dodaj
          </button>
        </form>
      </div>
      <p>
        {[sentTask?.id as string] + ":" + JSON.stringify(sentTask, null, 2)}
      </p>
    </>
  );
};

export default AddTaskForm;
