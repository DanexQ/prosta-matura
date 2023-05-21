import Task, { TaskProps } from "@components/Task/Task";
import TaskFilter, { FilterType } from "@components/TaskFilter";
import { TaskType } from "@components/TaskTypes";
import Tasks from "@components/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export interface TaskList extends TaskProps {
  id: string;
}

// async function getTasks() {
//   const tasksRef = collection(db, "tasks");
//   const data = await getDocs(tasksRef);
//   const tasks: TaskList[] = [];

//   data.forEach((doc) =>
//     tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
//   );
//   return tasks;
// }

async function getFilters() {
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
  // const [tasks, filters] = await Promise.all([getTasks(), getFilters()]);
  const filters = await getFilters();
  // let tasks: TaskList[] = await getFilteredTasks();

  async function getTasks(filter: string) {
    "use server";
    const res = await fetch(`http://localhost:3000/api${filter}`, {
      method: "GET",
    });
    const results = await res.json();
    console.log("REZULTAT", results);
    return results.tasks;
  }

  return (
    <div className="flex max-w-6xl gap-10 mx-auto">
      <Tasks getTasks={getTasks} filters={filters} />
    </div>
  );
}
