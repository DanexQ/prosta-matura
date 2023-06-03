import { FilterType, TaskList, TaskType } from "@components/types";
import Tasks from "@components/Tasks/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export type TasksDetailsType = {
  tasks: TaskList;
  tasksQuantity: number;
};

async function getFilters(): Promise<FilterType[]> {
  const taskTypesRef = collection(db, "taskTypes");
  const data = await getDocs(taskTypesRef);
  const types: FilterType[] = [];
  data.forEach((doc) =>
    types.push({
      id: doc.id as TaskType,
      quantity: doc.data().quantity,
      type: doc.data().type,
    })
  );
  return types;
}

export default async function Page() {
  const [{ tasks, tasksQuantity }, filters] = await Promise.all([
    getTasks(""),
    getFilters(),
  ]);

  async function getTasks(filter: string = ""): Promise<TasksDetailsType> {
    "use server";
    const res = await fetch(`http://localhost:3000/api${filter}`, {
      method: "GET",
    });
    const data = await res.json();
    // TODO: make response return sliced tasks and quantity of tasks
    console.log("FETCH FUNCTION", data);
    return data;
  }

  return (
    <Tasks
      getTasks={getTasks}
      filters={filters}
      initialTasks={tasks}
      initialQuantity={tasksQuantity}
    />
  );
}
