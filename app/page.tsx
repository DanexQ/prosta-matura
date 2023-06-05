import { FilterType, TaskList, TaskType } from "@components/types";
import Tasks from "@components/Tasks/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { Suspense } from "react";
import Loading from "./Loader";
import FiltersForm from "@components/Filters/FiltersForm";
import { useSearchParams } from "next/navigation";

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

export default async function Page({
  searchParams,
}: {
  searchParams: { filters: string; page: number };
}) {
  const filters = await getFilters();
  // todo: make searchparams working
  console.log(searchParams);
  return (
    <div className="flex max-w-6xl gap-10 mx-auto">
      <Suspense fallback={<Loading />}>
        <Tasks />
      </Suspense>
      <FiltersForm filterTypes={filters} />
    </div>
  );
}
