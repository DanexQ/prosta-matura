"use client";
import React, { useState } from "react";
import { TaskProps } from "./Task/Task";
import { addTask } from "@firebase/addTask";
import { taskTypes } from "./TaskTypes";

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
  const [task, setTask] = useState<TaskProps>(defaultTask);

  const [uploadedImage, setUploadedImage] = useState<File | undefined>(
    undefined
  );
  const [showTask, setShowTask] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const input = e.currentTarget;
    setTask((prevState) => ({ ...prevState, [input.name]: input.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addTask(task, uploadedImage);
  };

  return (
    <div className="self-stretch">
      <form className="w-full grid justify-items-center grid-cols-[1fr_4fr] [&>label]:text-center items-center gap-5 [&>label]:text-neutral-200 [&>textarea]:bg-neutral-900 [&>textarea]:border [&>textarea_&>select_&>input]:text-red-800 [&>textarea]:border-neutral-600 [&>*]:p-1 [&>textarea]:text-neutral-200 [&>textarea]:justify-self-stretch [&>select]:text-center">
        <label htmlFor="content">Treść:</label>
        <textarea
          id="content"
          name="content"
          onChange={handleChange}
          value={task.content}
        />
        <label htmlFor="answer">Odpowiedź:</label>
        <textarea
          id="answer"
          name="answer"
          onChange={handleChange}
          value={task.answer}
        />
        <label htmlFor="taskType">Typ zadania:</label>
        <select name="taskType" onChange={handleChange} value={task.taskType}>
          {taskTypes.map((taskType) => (
            <option key={taskType} value={taskType}>
              {taskType}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default NewTaskForm;
