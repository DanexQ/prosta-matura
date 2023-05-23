import { TaskProps } from "@components/Task/Task";
import { FilterType } from "@components/TaskFilter";
import { TaskType } from "@components/TaskTypes";
import Tasks from "@components/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export interface TaskList extends TaskProps {
  id: string;
}

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

async function getTasks(filter: string) {
  "use server";
  const res = await fetch(`http://localhost:3000/api${filter}`, {
    method: "GET",
  });
  const results = await res.json();
  return results.tasks;
}

export default async function Page() {
  const [tasks, filters] = await Promise.all([getTasks(""), getFilters()]);

  return (
    <div className="flex max-w-6xl gap-10 mx-auto">
      <Tasks getTasks={getTasks} filters={filters} initialTasks={tasks} />
    </div>
  );
}
