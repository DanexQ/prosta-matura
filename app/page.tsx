import Task, { TaskProps } from "@components/Task/Task";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";

interface TaskList extends TaskProps {
  id: string;
}
type TaskType = {
  type: string;
  quantity: number;
};

async function getTasks() {
  const tasksRef = collection(db, "tasks");
  const data = await getDocs(tasksRef);
  const tasks: TaskList[] = [];
  data.forEach((doc) =>
    tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
  );
  return tasks;
}

async function getFilters() {
  const taskTypesRef = collection(db, "taskTypes");
  const data = await getDocs(taskTypesRef);
  const types: TaskType[] = [];
  data.forEach((doc) =>
    types.push({ type: doc.id, quantity: doc.data().quantity })
  );
  return types;
}

export default async function Page() {
  const tasks = await getTasks();
  return (
    <>
      <section className="text-gray-100 flex-[3_1_0%] flex flex-col gap-5">
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </section>

      <section className="text-gray-100 flex-1 border border-neutral-600 flex flex-col items-center gap-2 py-4">
        <header className="text-lg font-semibold tracking-wider ">
          Filtruj zadania
        </header>
        <form className="flex flex-col gap-0.5">
          <div className="flex gap-1">
            <input type="checkbox" name="Równania trygonometryczne" />
            <label htmlFor="Równania trygonometryczne">
              Równania trygonometryczne
            </label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" name="Nierówności" />
            <label htmlFor="Nierówności">Nierówności</label>
          </div>
        </form>
      </section>
    </>
  );
}
